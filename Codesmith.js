var firstName="Egor";
var lastName="Kozitski";
var fullName=firstName+" "+lastName;
var age=23;
var linkedIn="https://www.linkedin.com/in/egor-kozitski-527aa9b6'";
var phone = 3475838019;
var city="Brooklyn";
var info = [fullName,linkedIn,phone,city];
var education = ["RIT","Computer Science",2018];
function createApp(info,education){
    return {
        'info':info,
        'education':education
    };
}



