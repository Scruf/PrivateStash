import pymssql
import pprint
pp = pprint.PrettyPrinter(indent=4)

DATABASE = {"HOST":"mssql.cmaqqkxgtdah.us-east-1.rds.amazonaws.com"
                    ,"DB":"hlx"
                                ,"NAME":"hlx"
                                            ,"PASS":"B45EKxteQHzCkAAfvhZMV8SNpYB7jmzbQ86khD7JeGhV8YXh4h"}

cnxnMS = pymssql.connect("DRIVER={{SQL Server}};SERVER={};DATABASE={}; UID={};PWD={};"
            .format(DATABASE['HOST'],DATABASE['DB'],DATABASE['NAME'],DATABASE['PASS']))
cursorMS = cnxnMS.cursor()

cursorMS.execute("""EXEC uspGetPandL""")

pp.pprint(cursorMS.fetchall())



# user already exists
# do not save the profile until approved
# account is pednding approval
# unit testing 
# uuid as username
