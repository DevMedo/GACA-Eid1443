function choose_image() {
    document.getElementById('choose_content').style.display = "table"
    document.getElementById('hide_if_clicked').style.display = "none";
    var elements = document.getElementsByClassName('eid_3')
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    document.getElementsByClassName('eid_4')[0].innerText = "فضلاً قم بإختيار القالب الذي تفضل";
}
User_name = document.getElementById('uName');
User_name.addEventListener('change', function() {
    if (User_name.value != '' && User_name.value != ' ') {
        document.getElementById('next_button').removeAttribute("disabled");
    } else {
        console.log('it is empty mate')
        document.getElementById('next_button').setAttribute("disabled", "true");
    }
});
checkboxes = document.getElementsByName("template_cbs");

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        enabledSettings =
            Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
            .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
            .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
        document.getElementById('downloadLNK').removeAttribute("disabled");
        my_selected_label = document.querySelector("label[for='" + checkbox.id + "']")
        desired_image_src = my_selected_label.getElementsByTagName('img')[0].src.split('/').pop()

        if (image_src.split('').pop() == "1.jpg") {
            desired_image_src = "eid_1_1443.jpg"
        } else {
            desired_image_src = "eid_2_1443.jpg"
        }
    })
});

function downloadImg() {
    var img = new Image();
    console.log(desired_image_src)
    img.src = "./images/" + desired_image_src;
    console.log(img.src)
    var canvas = document.createElement("CANVAS");
    var context = canvas.getContext("2d");


    img.onload = function() {
        var fileName = 'GACA-Eid-1443.jpg';
        context.canvas.width = img.width;
        context.canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        var name = document.getElementById("uName").value;

        if (desired_image_src == "eid_1_1443.jpg") {
            //if (desired_image_src == "example_1.jpg") {
            // Dark
            //context.fillStyle = "grey";
            context.fillStyle = "#FFF";
            context.font = "71.5px GB";
            context.textAlign = "center";
            context.fillText(name, 784.5, 1000);
        } else if (desired_image_src == "eid_2_1443.jpg") {
            //} else if (desired_image_src == "example_2.jpg") {


            // White Bluish
            //context.fillStyle = "grey";
            context.fillStyle = "#2574bb";
            context.font = "62.5px GB";
            context.textAlign = "center";
            context.fillText(name, 785, 1051);
        }

        if (window.navigator.msSaveBlob) { // IE
            var image = canvas.toDataURL("image/jpeg");
            var blob = createBlob(image);
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else if (navigator.userAgent.search("Firefox") !== -1) { // Firefox
            var image = canvas.toDataURL("image/jpeg");
            var blob = createBlob(image);
            var url = window.URL.createObjectURL(blob);

            var link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            // create an image in body and change it's source to view
            //document.getElementsByClassName('')[0].src = link
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        }

        // else if (navigator.userAgent.search("Safari") !== -1) { // Safari
        //     var image = canvas.toDataURL("image/jpeg");
        //     var blob = createBlob(image);
        //     var url = window.URL.createObjectURL(blob);

        //     var link = document.createElement('a');
        //     link.href = url;
        //     link.download = fileName;
        //     document.body.appendChild(link);
        //     link.click();
        //     // create an image in body and change it's source to view
        //     //document.getElementsByClassName('')[0].src = link
        //     document.body.removeChild(link);
        //     window.URL.revokeObjectURL(url);
        // }
        else { // Chrome
            var image = canvas.toDataURL("image/jpeg");
            var link = document.createElement('a');
            link.href = image;
            link.download = fileName;
            link.click();
            // create an image in body and change it's source to view            
            //document.getElementsByClassName('')[0].src = link
        }
    };
};

function createBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], {
            type: contentType
        });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {
        type: contentType
    });
}