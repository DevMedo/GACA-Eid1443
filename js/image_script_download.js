function choose_image() {
    document.getElementById('choose_content').style.display = "table"
    document.getElementById('hide_if_clicked').style.display = "none";
    var elements = document.getElementsByClassName('eid_3')
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    document.getElementsByClassName('eid_4')[0].innerText = "فضلاً قم بإختيار القالب الذي تفضل";
}
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
        var fileName = 'GACA-Eid-1443.png';
        context.canvas.width = img.width;
        context.canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        var name = document.getElementById("uName").value;

        if (desired_image_src == "eid_1_1443.png") {
            // Dark
            context.fillStyle = "#FFF";
            context.font = "186px GB";
            context.textAlign = "center";
            context.fillText(name, 2040, 2605);
        } else if (desired_image_src == "eid_2_1443.png") {
            // White Bluish
            context.fillStyle = "#2574bb";
            context.font = "163px GB";
            context.textAlign = "center";
            context.fillText(name, 2042, 2737);
        }

        if (window.navigator.msSaveBlob) { // IE
            var image = canvas.toDataURL("text/plain");
            var blob = createBlob(image);
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else if (navigator.userAgent.search("Firefox") !== -1) { // Firefox
            var image = canvas.toDataURL("text/plain");
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
        //     var image = canvas.toDataURL("text/plain");
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
            var image = canvas.toDataURL("text/plain");
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