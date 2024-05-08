document.addEventListener('DOMContentLoaded', function() {
    var inputField = document.querySelector('.seagate_date_field');
    var separator = document.querySelector('.separator');
    var format = document.querySelector('.format');
    var output = document.querySelector('.seagate_date_output');
    
    var toggle = false;
    var date;
    function display_date() {
        if (!date) {return}

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {month = '0' + month}
        if (day < 10) {day = '0' + day};

        var mid = separator.value;
        var row = [];
        for (let i = 0; i < 3; i++) {
           form = format.value.substr(i, 1)
           if (form == 'd') {row.push(day)}
           if (form == 'm') {row.push(month)}
           if (form == 'y') {row.push(year)}
        }

        var out = row[0] + mid + row[1] + mid + row[2];
        output.innerHTML = out;
    };

    if (inputField) {
        inputField.addEventListener('input', function() {
            if (inputField.validity.valid) {
                var str = this.value || "";
                var str_len = str.length;
                if (str_len == 4 || str_len == 5) {
                    var yy = parseInt(str.substr(0, 2), 10);
                    var ww = parseInt(str.substr(2, 1+(str_len-4)), 10);
                    var d = parseInt(str.substr(3+(str_len-4), 1), 10);
                    var year = 1999 + yy;
                    
                    //Temporary date with starting date of july 1st in given year
                    let julyM = new Date(year, 6, 1);
                    let dayOfWeek = julyM.getDay();
                    let drif = (6 - dayOfWeek + 7) % 7;
                    julyM.setDate(julyM.getDate() + drif);
                    
                    //Set a date with given week and day of week
                    date = new Date(julyM);
                    date.setDate(julyM.getDate() + (ww - 1) * 7 + (d - 1));

                    display_date();
                    toggle = true;
                    output.style.cursor = 'grab';
                } else {
                    output.innerHTML = "Please enter 4 or 5 digits code.";
                    toggle = false;
                    output.style.cursor = 'default';
                }
            };
        });
    };

    if (separator) {
        separator.addEventListener('change', function() {
            display_date();
        });
    };

    if (format) {
        format.addEventListener('change', function() {
            display_date();
        });
    };

    if (output) {
        output.addEventListener('click', function() {
            if (toggle) {
                navigator.clipboard.writeText(output.innerHTML);

                let tempText = output.innerHTML;
                output.innerHTML = "Copied to clipboard.";
                setTimeout(function() {
                    output.innerHTML = tempText;
                }, 1000);
            }
        });
    }
});
