from django import forms
from django.shortcuts import get_object_or_404, render, redirect
from django.core.urlresolvers import reverse_lazy
from django.views.generic import edit, list, DetailView 
from django.utils.decorators import method_decorator
from django.http import HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from . import forms
from . import models

# User Generic Views.
class UserCreate(edit.CreateView):
    model = models.User
    form_class = forms.MyRegistrationForm
    template_name = "system/registration_form.html"
    success_url = reverse_lazy('system:edit_profile')
    
    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        logout(self.request)
        return super(UserCreate, self).form_valid(form)

#View that lets an admin create other staff accounts
@method_decorator(login_required, name='dispatch')
class StaffCreate(edit.CreateView):
    model = models.User
    form_class = forms.AdminRegistrationForm
    template_name = "system/registration_form.html"
    success_url = reverse_lazy('system:dashboard')
    
    #Checks to make sure the user the form is being sent to is an admin
    def dispatch(self, request):
        user = get_object_or_404(models.Registration, user=request.user)
        if user.role == models.Registration.ADMIN:
            return super(StaffCreate, self).dispatch(request)
        else:
            return HttpResponseForbidden()

#View for post-account-creation patients to create or update their individual information
# Redirects to proper view based on user role.
@login_required
def register(request):
    user = get_object_or_404(models.Registration, user=request.user)
    if user.role == models.Registration.PATIENT:
        return UserRegister.as_view()(request)
    else:
        return StaffRegister.as_view()(request)
    return HttpResponseForbidden()

#View for post-account-creation patients to create or update their individual information
class UserRegister(edit.UpdateView):
    model = models.Registration
    fields = ['primary_care', 'date_of_birth', 'phone_number', 'mail_address', 'hospital']
    template_name = "system/registration_profile_info.html"
    success_url = reverse_lazy('system:dashboard')

    #Retrieves the user from the database
    def get_object(self, queryset=None):
        return get_object_or_404(models.Registration, user=self.request.user)

#Form for post-account-creation staff to create or update their individual information
class StaffRegister(edit.UpdateView):
    model = models.Registration
    fields = ['date_of_birth', 'phone_number', 'mail_address']
    template_name = "system/registration_profile_info.html"
    success_url = reverse_lazy('system:dashboard')

    #Retrieves the user from the database
    def get_object(self, queryset=None):
        return get_object_or_404(models.Registration, user=self.request.user)

#Gets a list of all registered users
@method_decorator(login_required, name='dispatch')
class UserList(list.ListView):
    #Defining Parameters
    model = models.Registration
    queryset = models.Registration.objects.all()

    #Performs the request with the given parameters
    def get(self, request):
        user = get_object_or_404(models.Registration, user=request.user)
        if user.role == models.Registration.ADMIN:
            return super(UserList, self).get(request)
        else:
            return HttpResponseForbidden()

#Displays the details of a single user
@method_decorator(login_required, name='dispatch')
class UserDetail(DetailView):
    model = models.Registration

    #Performs the request with the given parameters
    def get(self, request, pk):
        user = get_object_or_404(models.Registration, user=request.user)
        if user.role == models.Registration.ADMIN:
            return super(UserDetail, self).get(request, pk)
        else:
            return HttpResponseForbidden()


#View to delete a user
@method_decorator(login_required, name='dispatch')
class UserDelete(edit.DeleteView):
    model = models.User
    success_url = reverse_lazy("system:dashboard")
    
    #Checks to see if the user is admin before deleting the user
    def dispatch(self, request, pk):
        user = get_object_or_404(models.Registration, user=request.user)
        if user.role == models.Registration.ADMIN:
            return super(UserDelete, self).dispatch(request, pk)
        else:
            return HttpResponseForbidden()

#View for the dashboard, each dashboard is generated separately depending on what role the user is
@login_required
def dashboard(request):
    user = get_object_or_404(models.Registration, user=request.user)
    if user.role == models.Registration.DOCTOR:
        appt = models.Appointment.objects.filter(doctor=user)
        #If they are checked in to a hospital, remove any that aren't in the doctor's hospital
        patients = models.Registration.objects.filter(role='PT').order_by('in_hospital')
        template_name = "system/doctor_dashboard.html"
        return render(request, template_name, context={'user':user, 'appts':appt, 'ptnts':patients})
    elif user.role == models.Registration.PATIENT:
        appt = models.Appointment.objects.filter(patient=user)
        template_name = "system/patient_dashboard.html"
        return render(request, template_name, context={'user':user, 'appts':appt})
    elif user.role == models.Registration.NURSE:
        #If they are checked in to a hospital, remove any that aren't in the doctor's hospital
        patients = models.Registration.objects.filter(role='PT').order_by('in_hospital')
        template_name = "system/nurse_dashboard.html"
        return render(request, template_name, context={'user':user, 'ptnts':patients})
    elif user.role == models.Registration.ADMIN:
        system_act = models.Activity.objects.all()
        users = models.Registration.objects.all()
        hospitals = models.Hospital.objects.all()
        template_name = "system/admin_dashboard.html"
        return render(request, template_name, context={'user':user, 'sys':system_act, 'users':users, 'hosp':hospitals})

    return HttpResponseForbidden()

#Admit patient view
def admit_patient(request, pk):
    user = get_object_or_404(models.Registration, user=request.user)
    if user.role == models.Registration.DOCTOR or user.role == models.Registration.NURSE:
        models.Registration.objects.filter(user=pk).update(in_hospital=True)
        return redirect('/dashboard/')
    return HttpResponseForbidden()

#Discharge patient view
def discharge_patient(request, pk):
    user = get_object_or_404(models.Registration, user=request.user)
    if user.role == models.Registration.DOCTOR:
        models.Registration.objects.filter(user=pk).update(in_hospital=False)
        return redirect('/dashboard/')
    return HttpResponseForbidden()

#Home page view
def index(request):
    return render(request, "system/home.html")

#Logout view
def logout_view(request):
    logout(request)
    return redirect('/accounts/login/')

#View to create an appointment
@login_required
def create_appt(request):
    user = get_object_or_404(models.Registration, user=request.user)
    if user.role == models.Registration.DOCTOR:
        return ApptCreateDoctor.as_view()(request)
    elif user.role == models.Registration.PATIENT:
        return ApptCreatePatient.as_view()(request)
    return HttpResponseForbidden()

#View to update an appointment
@login_required
def update_appt(request, pk):
    user = get_object_or_404(models.Registration, user=request.user)
    if user.role == models.Registration.DOCTOR:
        return ApptUpdateDoctor.as_view()(request, pk=pk)
    elif user.role == models.Registration.PATIENT:
        return ApptUpdatePatient.as_view()(request, pk=pk)
    return HttpResponseForbidden()

#View to delete an appointment
@login_required
def delete_appt(request, pk):
    user = get_object_or_404(models.Registration, user=request.user)
    if user.role == models.Registration.DOCTOR:
        return ApptDeleteDoctor.as_view()(request, pk=pk)
    elif user.role == models.Registration.PATIENT:
        return ApptDeletePatient.as_view()(request, pk=pk)
    return HttpResponseForbidden()

# Appt Generic Views
class ApptCreatePatient(edit.CreateView):
    model = models.Appointment
    fields = ['doctor', 'date_scheduled']
    template_name = "system/appointment_form.html"
    success_url = reverse_lazy("system:dashboard")

    def form_valid(self, form):
        patient = models.Registration.objects.get(user=self.request.user)
        self.object = form.save(commit=False)
        self.object.patient = patient
        self.object.save()
        return super(edit.ModelFormMixin, self).form_valid(form)

# Appt Generic Views
class ApptCreateDoctor(edit.CreateView):
    model = models.Appointment
    fields = ['patient', 'date_scheduled']
    template_name = "system/appointment_form.html"
    success_url = reverse_lazy("system:dashboard")

    def form_valid(self, form):
        doctor = models.Registration.objects.get(user=self.request.user)
        self.object = form.save(commit=False)
        self.object.doctor = doctor
        self.object.save()
        return super(edit.ModelFormMixin, self).form_valid(form)

#View to update an appointment if the logged in user is a doctor
@method_decorator(login_required, name='dispatch')
class ApptUpdateDoctor(edit.UpdateView):
    model = models.Appointment
    fields = ['patient', 'date_scheduled']
    template_name = "system/appointment_form.html"
    success_url = reverse_lazy("system:dashboard")

#View to update an appointment if the logged in user is a patient
@method_decorator(login_required, name='dispatch')
class ApptUpdatePatient(edit.UpdateView):
    model = models.Appointment
    fields = ['doctor', 'date_scheduled']
    template_name = "system/appointment_form.html"
    success_url = reverse_lazy("system:dashboard")

#View to delete an appointment if the logged in user is a doctor
@method_decorator(login_required, name='dispatch')
class ApptDeleteDoctor(edit.DeleteView):
    model = models.Appointment
    success_url = reverse_lazy("system:dashboard")

#View to delete an appointment if the logged in user is a patient
@method_decorator(login_required, name='dispatch')
class ApptDeletePatient(edit.DeleteView):
    model = models.Appointment
    success_url = reverse_lazy("system:dashboard")

# Hospital Generic Views
@method_decorator(login_required, name='dispatch')
class HospitalCreate(edit.CreateView):
    model = models.Hospital
    fields = ['name','doctors']
    template_name = "system/hospital_form.html"
    success_url = reverse_lazy("system:dashboard")

    def dispatch(self, request):
        user = get_object_or_404(models.Registration, user=request.user)
        if user.role == models.Registration.ADMIN:
            return super(HospitalCreate, self).dispatch(request)
        else:
            return HttpResponseForbidden()

