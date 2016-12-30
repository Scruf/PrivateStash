from flask import Flask,request
from flask_restful import Resource, Api,reqparse
from flaskext.mysql import MySQL

mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'NokiaLumia920'
app.config['MYSQL_DATABASE_DB'] = 'ItemListDb'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


api = Api(app)

class CreateUser(Resource):
	def post(self):
		try:
			parser = reqparse.RequestParser()
			parser.add_argument('email',type=str,help='Enter email')
			parser.add_argument('password',type=str,help='Enter password')
			args = parser.parse_args()
			conn = mysql.connect()
			cursor = conn.cursor()
			_user_email = args['email']
			_user_password = args['password']
			cursor.callproc('spCreateUser',(_user_email,_user_password))
			data = cursor.fetchall()
			cursor.close()
			if len(data) == 0:
				return {
							'StatusCode':'200','Message':'USer successfully created'
					   }
			else:
				return {
					'404':'Something went wrong'
				}
		except Exception as ex:
			return{
				"Error":str(ex)
			}


class HelloWorld(Resource):
	def get(self):
		return {
			'Hello':"World"
		}

class Goodbye(Resource):
	def get(self):
		return {
			'Goodbye':'World'
		}
todos = {}
class ToDoSimple(Resource):
	def get(self,todo_id):
		return {todo_id:todos[todo_id]}

	def put(self,todo_id):
		todos[todo_id] = request.form['data']
		return {todo_id:todos[todo_id]}



api.add_resource(ToDoSimple,'/<string:todo_id>')
api.add_resource(Goodbye,'/bye')
api.add_resource(HelloWorld,'/')
api.add_resource(CreateUser,'/create')

if __name__ == '__main__':
	app.run(debug=True)