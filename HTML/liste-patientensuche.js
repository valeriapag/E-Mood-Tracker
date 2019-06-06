var options = {
    valueNames:['fname', 'lname','name']
};

var people = new List('people', options);

var fnameField = $('#fnameField'),
    lnameField = $('#lnameField'),
    yearField = $('#yearField'),
    addBrn = $('#add-btn');

addBtn.click(function() {
    people.add({
        fname: fnameField.val(),
        lname: lnameField.val(),
        year: yearField.val()
    });
});