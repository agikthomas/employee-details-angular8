#!/usr/bin/perl
use strict;
use warnings;
use v5.10; # for say() function

use DBI;

my $dsn = "DBI:mysql:users";
my $username = "thomas";
my $password = 'thomas';


# connect to MySQL database
my %attr = (PrintError=>0,RaiseError=>1 );

my $dbh = DBI->connect($dsn,$username,$password,\%attr);

# query data from the links table
populateRecord($dbh);

$dbh->disconnect();


sub populateRecord{
	my($dbh) = @_;
	my @records = (
		{
			name => 'John',
			age => 30,
			sex => 'Male',
			address => ['John residences, Bangalore', 'John Office address, Bangalore']
		},
		{
			name => 'Thomas',
			age => 36,
			sex => 'Male',
			address => ['DNR Atmosphere, Bangalore', 'Office of thomas, Bangalore'],
		},
		{
			name => 'Tina',
			age => 40,
			sex => 'Female',
			address => ['Fountain Residences, Bangalore', 'Office of tina, Bangalore', 'Home town address, Kottayam'] 
		}
	);
	my $stmt = $dbh->prepare(qq~INSERT INTO employee (name, age, sex) values(?, ?, ?)~);
	my $idStmt = $dbh->prepare(qq~SELECT MAX(empid) from employee~);
	my $relStmt = $dbh->prepare(qq~insert into employee_address(address, empid) values (?, ?)~);
	foreach(@records) {
		$stmt->execute($_->{name}, $_->{age}, $_->{sex});
		$stmt->finish();
		#$dbh->commit();

		$idStmt->execute();
		my ($id) = $idStmt->fetchrow_array();

		foreach my $addr(@{$_->{address}}) {
			$relStmt->execute($addr, $id);
		}
		$relStmt->finish();
				
	}

}
