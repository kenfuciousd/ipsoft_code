#!/usr/bin/expect -f
# SCRIPT:  testSsh.sh
# ARGUMENTS: $1 host, $2 username, $3 password
# OUTPUTS: returns status of ssh connection
# PURPOSE:
#test: 10.7.42.xx
set ipaddr [lrange $argv 0 0]
set username "USER"
set pword "PASSWORD"
set succcess "0"
set sleeptime "5"
#puts "\r\r ipaddr os $ipaddr, username is $username, and password is $pword\r\r"
#./ssh.exp password 192.168.1.11 id
set prompt "(%|>|#|\\\$) $"
spawn ssh -l $username $ipaddr
sleep $sleeptime
expect {
    eof     {puts "\rConnection rejected by the host"; exit 0;}
    timeout {puts "\rUnable to access the host"; exit 0;}
    "*yes\/no*" {send "yes\r"}
    "*?assword:*" {send "PASSWORD\r";}
    }
expect {
    timeout {puts "\rUnable to access the host - at password prompt"; exit 0;}
    -re $prompt {puts "\rconnected"; send "logout\r"; interact; exit 1;}
    "*?assword:*" {send "PASSWORD\r";}
}
expect {
    timeout {puts "\r with $pword, unable to access the host - at password sending"; exit 0;}
    -re $prompt {puts "\rconnected"; send "logout\r"; interact; exit 1;}
    "*?assword:*" {send "PASSWORD\r";}
    }
send -- "echo \$?\r"
expect {-re "\r\n(\\d+)\r\n.*$prompt" {puts "\rconnected"; send "logout\r"; interact; exit 1;}

    }
send -- "logout\r"
interact


