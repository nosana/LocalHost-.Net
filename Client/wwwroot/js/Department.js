$("#data-departments").DataTable({
    ajax: {

        url: "https://localhost:7181/api/Department",
        dataSrc: "data",
    },

    columns: [
        {
            data: null,
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            },
        },
        {
            data: "id",

        },
        {
            data: "name",
        },
        {
            data: "divisionId",
        },
        {
            data: null,
            render: function (data, type, row, meta) {
                return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="detailsDepartment('${data.id}')">
                         Details
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editDepartment('${data.id}')">
                         Edit
                        </button>
                        <button type="button" class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="deleteDivision('${data.id}')">
                         Delete
                        </button>
                        `
            }
        },
    ],
});

function createDeprtment() {
    let data;
    let id = 0;
    let name = $('#departName').val();
    let divisionId = $(`#devisionId`).val();

    divisionId = parseInt(divisionId);
    data = {
        "id": id,
        "name": name,
        "divisionId": divisionId
    };
    /*console.log(data);*/
    
    $.ajax({
        type: "POST",
        url: `https://localhost:7181/api/Department/`,
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            alert('Load was performed.');
            location.reload();
        }
    });

}

function detailsDepartment(id) {
    $.ajax({
        url: `https://localhost:7181/api/Department/${id}`,
        type: "GET"
    }).done((res) => {
        /*console.log(res.data.id);*/
        let temp = "";
        temp += `  
                    <input type ="hidden" class="form-control" id="hidenId" readonly placeholder="" value = "0">
                    <p>Id: </p><input type ="text" class="form-control" id="departId" readonly placeholder= "${res.data.id}" value = "${res.data.id}">
                    <p>Name: </p><input type ="text" class="form-control" id="departName" readonly placeholder= "${res.data.name}" value = "${res.data.name}">
                   <p>DivisionId: </p><input type ="text" class="form-control" id="devisionId" readonly placeholder= "${res.data.divisionId}" value = "${res.data.divisionId}">

                   `;
        $("#details").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function editDepartment(id) {

    $.ajax({
        type: "GET",
        url: `https://localhost:7181/api/Department/${id}`
    }).done((res) => {
        let temp = "";
        temp += ` <input type ="hidden" class="form-control" id="hidenId" readonly placeholder="" value = "0">
                   <p>Id: </p><input type ="text" class="form-control" id="departId" readonly placeholder= "${res.data.id}" value = "${res.data.id}">
                   <p>Name: </p><input type ="text" class="form-control" id="departName" placeholder= "${res.data.name}" value = "${res.data.name}">
                    <p>DivisionId: </p><input type ="text" class="form-control" id="devisionId" placeholder= "${res.data.divisionId}" value = "${res.data.divisionId}">
                    `;
        $("#edit").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function saveEdit() {
    let data;
    let id = parseInt($('#departId').val());
    let name = $('#departName').val()
    let divisionId = parseInt($('#devisionId').val());

    data = {
        "id": id,
        "name": name,
        "divisionId": divisionId
    }

    $.ajax({
        url: 'https://localhost:7181/api/Department/',
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            alert('Load was performed.');
            location.reload();
        }
    });
}

function deleteDivision(id) {
    $.ajax({
        url: `https://localhost:7181/api/Department/${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: function (message) {
            alert("Delete Data Successfull" + message);
            location.reload();
        }
    })
}


$.ajax({
    url: 'https://localhost:7181/api/Divisons',
}).done((res) => {
    let divisions = "";
    $.each(res.data, function (key, val) {
        divisions += `<option value="${val.id}">${val.name}</option>`
    });

    $("#InputDivisionIdDepartement").html(divisions);
});
