#!/usr/bin/perl
use strict;
use warnings;
use v5.10; # for say() function
 
use DBI;
use CGI;
use JSON;


my $dsn = "DBI:mysql:users";
my $username = "thomas";
my $password = 'thomas';


# connect to MySQL database
my %attr = (PrintError=>0,RaiseError=>1 );

my $query = new CGI;
my $action  = $query->param('action') || 'get_emp_addr';
my $dbh = DBI->connect($dsn,$username,$password,\%attr);

# query data from the links table
print $query->header(-type => "application/json",
                 -access_control_allow_origin => '*');

if($action eq 'all_employees') {
	&readAllEmployeeData($dbh);
} elsif($action eq 'get_emp_addr') {
	my $empId = $query->param('emp_id') || 9;
	&getEmplAddr($dbh,$empId);
}

$dbh->disconnect();


sub getEmplAddr{
	my ($dbh, $empId) = @_;
	my $sql = qq~select address from employee_address where empid = ?~;
	my $sth = $dbh->prepare($sql);
	my @respData = ();
	$sth->execute($empId);
	while(my @rows = $sth->fetchrow_array()) {
		push(@respData, $rows[0]);
	}
	$sth->finish();
	my $jsonResp = to_json(\@respData);
	print $jsonResp;
	print "\n";
	
}

sub readAllEmployeeData{
	my($dbh) = @_;
	my $sql = qq~select empid, name, age, sex from employee~;
	my $sth = $dbh->prepare($sql);
	my @respData = ();
	$sth->execute();
	while(my @rows = $sth->fetchrow_array()) {
		push(@respData,{
			empid  => $rows[0],
			name => $rows[1],
			age => $rows[2],
			sex => $rows[3]
		});
		
	}
	my $jsonResp = to_json(\@respData);
	print $jsonResp;
	print "\n";
	$sth->finish();
}





 
