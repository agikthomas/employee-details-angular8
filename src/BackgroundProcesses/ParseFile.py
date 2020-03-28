import pandas as pd
import numpy as np
import re
from numpy  import array
import glob
import os

def getExceptionBlock(content):
    df = pd.DataFrame(columns=['log'])
    line_no = 0
    start_loc = 0
    fw_ptr = 0 
    #for line in content :
    while line_no < len(content):
        line = content[line_no]
        if 'exception' in line.lower():
            start_loc = line_no
            block_content = "";
            for bk_track in range(start_loc,0,-1):
                if re.match(r"^\S{3}\s\S{3}\s\d{2}\s\d{2}\:\d{2}\:\d{2}\sP[S|D]T\s\d{4}",content[bk_track]) or re.match(r"^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d+\-\d+",content[bk_track]):
                    block_content = content[bk_track] +"\n"+ block_content
                    break
                else:
                    block_content = content[bk_track] +"\n"+ block_content

            fw_ptr = 0
            for fw_track in range(start_loc+1,len(content)):
                if re.match(r"^\S{3}\s\S{3}\s\d{2}\s\d{2}\:\d{2}\:\d{2}\sP[S|D]T\s\d{4}",content[fw_track]) or re.match(r"^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d+\-\d+",content[fw_track]):
                    break
                else:
                    block_content = block_content.rstrip("\n") +"\n"+ content[fw_track]
                    fw_ptr = fw_ptr+1

            line_no = line_no + fw_ptr
            df = df.append({'log': block_content}, ignore_index=True)


        line_no = line_no+1
    
    return df


def process(string):
    data = ''
    #string=' '.join([word if word not in stopword_set else '' for word in string.split()])
    string=re.sub("(Native Method)","",string)
    string=string.lower()
    string=string.rstrip()
    words = string.split()

    for word in words:
        word=re.sub("\d","",word)
        #word=re.sub(":"," ",word)
        word=re.sub("\'",'',word)
        word=re.sub("\*",' ',word)
        word=re.sub("=",' ',word)
        word=re.sub(",",' ',word)

        word=re.sub("^\S{3}\s\S{3}\s\d{2}\s\d{2}\:\d{2}\:\d{2}\sP[S|D]T\s\d{4}",'',word)
        word=re.sub("Exception:",'',word)


        #Valid952HostnameRegex = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-\(\)\:\.<>]*[A-Za-z0-9\(\)\:\.<>])$";
        #Valid952HostnameRegex = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-\(\.]*[a-zA-Z0-9\)])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-\(\)\:\.<>]*[A-Za-z0-9\(\)\:\.<>])$";
        Valid952HostnameRegex = "^(ariba|org|java)\.(([a-zA-Z\$]|[a-zA-Z][a-zA-Z0-9\-\(\s\$]*[a-zA-Z0-9\)])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-\(\)\:\.<>\$]*[A-Za-z0-9\(\)\:\.<>])$"
        word=re.sub("Exception:",'',word)

        #if re.match(Valid952HostnameRegex, word):


        if re.match(Valid952HostnameRegex, word) and len(word.split('.')) > 2:
            data = data.strip() + ' ' + word

    #print(data,"\n")
    #return data.split()
    return data


df_merged = pd.DataFrame(columns=['log_str','log_Count'])
df_merged_final = pd.DataFrame(columns=['log_str','log_Count'])
    
#for filename in glob.glob("/data/assignment/krlogs/keepRunning*"):
for filename in glob.glob("/data/assignment/keepRunning-Node1-app100ksa1--C0_Admin1-11448.1"):
    content=''
    with open(filename,encoding='utf-8', errors='ignore') as f:
        df_final = pd.DataFrame(columns=['log', 'log_str'])
        df_merged = pd.DataFrame(columns=['log_str','log_Count'])
        
        print('Prcessing File : '+filename)
        #token_words = []
        content = f.readlines()
        
        content = [x.strip() for x in content]
        df = getExceptionBlock(content)
        df['log_str'] = df['log'].apply(process)
        df = df[df['log_str'] != ""]
        print('Created Records of length '+ str(df['log_str'].count()))
        df_final = pd.concat([df_final, df])
        
        df2 = df_final.groupby('log_str').count()
        df3 = df2.add_suffix('_Count').reset_index()
        df3= df3.sort_values(['log_Count'], ascending=False)
        df3.reset_index(drop=True, inplace=True)
        df_merged = df_merged_final.copy(deep=True)    
        df_merged_final = pd.concat([df_merged, df3]).groupby('log_str')['log_Count'].sum().reset_index()
        
        
df_merged_final.to_csv('/data/assignment/backup/output/'+'keepRunning-Node1-app100ksa1--C0_Admin1-11448.1'+'.csv')

