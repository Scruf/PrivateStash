# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-10-30 16:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0003_auto_20160925_2342'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.AddField(
            model_name='registration',
            name='doctors',
            field=models.ManyToManyField(related_name='_registration_doctors_+', to='system.Registration'),
        ),
        migrations.AlterField(
            model_name='registration',
            name='primary_care',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='primary_patients', to='system.Registration'),
        ),
        migrations.AddField(
            model_name='hospital',
            name='doctors',
            field=models.ManyToManyField(related_name='employed_hospitals', to='system.Registration'),
        ),
        migrations.AddField(
            model_name='hospital',
            name='patients',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hospital', to='system.Registration'),
        ),
    ]
