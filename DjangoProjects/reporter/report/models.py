from __future__ import unicode_literals

from django.db import models
import uuid
# Create your models here.
class User(models.Model):
	user_id = models.UUIDField(default=uuid.uuid4)
	is_approved = models.BooleanField()
	email = models.CharField(max_length=250)
	password = models.CharField(max_length=250)

	def __str__(self):
		return self.email + " " + str(self.user_id)