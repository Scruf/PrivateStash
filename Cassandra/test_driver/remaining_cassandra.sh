sudo rm -rf /usr/bin/cassandra-stress
sudo rm -rf /run/systemd/generator.late/graphical.target.wants/cassandra.service
sudo rm -rf /run/systemd/generator.late/multi-user.target.wants/cassandra.service
sudo rm -rf /home/scruf/Downloads/apache-cassandra-3.0.6
sudo rm -rf /home/scruf/Downloads/apache-cassandra-3.0.6-bin.tar.gz
sudo rm -rf /home/scruf/.cassandra
sudo rm -rf /etc/rc2.d/S03cassandra
sudo rm -rf /etc/rc4.d/S03cassandra
sudo rm -rf /etc/sysctl.d/cassandra.conf
sudo rm -rf /etc/rc0.d/K01cassandra
sudo rm -rf /etc/rc6.d/K01cassandra
sudo rm -rf /etc/rc1.d/K01cassandra
sudo rm -rf /etc/rc5.d/S03cassandra
sudo rm -rf /etc/rc3.d/S03cassandra
sudo rm -rf /etc/apt/sources.list.d/cassandra.sources.list
sudo rm -rf /etc/apt/sources.list.d/cassandra.sources.list.save
sudo rm -rf /etc/security/limits.d/cassandra.conf
CREATE KEYSPACE "demo"
  WITH REPLICATION = {'class' : 'NetworkTopologyStrategy', 'dc1' : 3, 'dc2' : 2};