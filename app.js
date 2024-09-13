const btn = document.querySelector(".Submit_btn");

//Event listener for submit button
btn.addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    let stdid = document.querySelector("#StudentId").value;
    let email = document.querySelector("#EmailId").value;
    let contact = document.querySelector("#ContactNo").value;

    if (!name) {
        alert("Please enter a valid name.");
        return;
    }
    if (!stdid) {
        alert("Please enter a valid Student ID.");
        return;
    }
    if (!email || !email.includes('@')) {  
        alert("Please enter a valid email address.");
        return;
    }
    if (!contact) {
        alert("Please enter a valid contact number.");
        return;
    }
    
    addTableData(name, stdid, email, contact);
    
})

//Function to add data to the table
function addTableData(name, stdid, email, contact) {
    let table = document.querySelector("#table");

    let tablerow = document.createElement("tr");
    let namecell = document.createElement("td");
    let stdidcell = document.createElement("td");
    let emailcell = document.createElement("td");
    let contactcell = document.createElement("td");
    let buttonscell = document.createElement("td");
    let editbtn = document.createElement("button");
    let deletebtn = document.createElement("button");

    namecell.textContent = name;
    stdidcell.textContent = stdid;
    emailcell.textContent = email;
    contactcell.textContent = contact;
    editbtn.textContent = "Edit";
    deletebtn.textContent = "Delete";

    editbtn.classList.add("edit_btn");
    deletebtn.classList.add("del_btn");

    buttonscell.appendChild(editbtn);
    buttonscell.appendChild(deletebtn);

    tablerow.appendChild(namecell);
    tablerow.appendChild(stdidcell);
    tablerow.appendChild(emailcell);
    tablerow.appendChild(contactcell)
    tablerow.appendChild(buttonscell);

    table.appendChild(tablerow);

    document.querySelector("#name").value = "";
    document.querySelector("#StudentId").value = "";
    document.querySelector("#EmailId").value = "";
    document.querySelector("#ContactNo").value = "";

    saveTableData();
    
    //Event listener for edit button
    editbtn.addEventListener('click', ()=>{
        

        if(editbtn.textContent == "Edit"){

            originalValues = {
                name: namecell.textContent,
                stdid: stdidcell.textContent,
                email: emailcell.textContent,
                contact: contactcell.textContent
            };

            namecell.contentEditable = 'true';
            stdidcell.contentEditable = 'true';
            emailcell.contentEditable = 'true';
            contactcell.contentEditable = 'true';
            editbtn.textContent = "Save";
        }else{
            
            namecell.contentEditable = 'false';
            stdidcell.contentEditable = 'false';
            emailcell.contentEditable = 'false';
            contactcell.contentEditable = 'false';
            editbtn.textContent = "Edit";

            let editedEmail = emailcell.textContent.trim();
            let editedContact = contactcell.textContent.trim();

            if (!editedEmail.includes('@')) {
                alert("Please enter a valid email address.");
                emailcell.textContent = originalValues.email;
            } else if (isNaN(editedContact)) {
                alert("Please enter a valid contact number.");
                contactcell.textContent = originalValues.contact;
            } else {
                editbtn.textContent = "Edit";
                namecell.textContent = namecell.textContent.trim();
                stdidcell.textContent = stdidcell.textContent.trim();
                emailcell.textContent = editedEmail;
                contactcell.textContent = editedContact;
            }
            saveTableData();
        }
    });

    //Event listener for delete button
    deletebtn.addEventListener('click', () => {
        tablerow.remove();
        saveTableData();
    })
}

//Function for saving the table data into local storage
function saveTableData(){
    let rows = document.querySelectorAll("#table tr");
    let tableData = [];

    rows.forEach(row => {
        let cells = row.querySelectorAll('td');
        if(cells.length > 0){
            let name = cells[0].textContent.trim();
            let stdid = cells[1].textContent.trim();
            let email = cells[2].textContent.trim();
            let contact = cells[3].textContent.trim();
            tableData.push({name, stdid, email, contact});
        }
        localStorage.setItem('tableData', JSON.stringify(tableData));
    })
}

//Event listener to add the table data when the page loads
window.addEventListener('load', () => {
    let data = JSON.parse(localStorage.getItem('tableData')) || [];
    data.forEach(item => addTableData(item.name, item.stdid, item.email, item.contact));
})