$(document).ready(function () {
    $("#data-divisions").DataTable({
        ajax: {

            url: "https://localhost:7181/api/Divisons",
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
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="detailsDivision('${data.id}')">
                         Details
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editDivision('${data.id}')">
                         Edit
                        </button>
                        <button type="button" class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="deleteModal" onclick="deleteDivision('${data.id}')">
                         Delete
                        </button>
                           
                        `
                }
            },
        ],
        dom: 'Bfrtip',
        buttons: ['colvis', 'copy', 'excel', 'pdf', 'print']
    });
    for (var i = 1; i < 7; i++) {
        $.ajax({
            url: 'https://localhost:7181/api/Divisons/' + i,
            dataType: 'json',
            success: function (json) {
                table.rows.add(json.results).draw();
            }
        });
    }
});



function createDivision() {
    let data;
    let id = 0;
    let name = $('#divisionName').val();

    data = {
        "id": id,
        "name": name
        
    };
    console.log(data);

    $.ajax({
        type: "POST",
        url: `https://localhost:7181/api/Divisons/`,
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
            
        }
    });
}

 
function detailsDivision(id) {
    $.ajax({
        url: `https://localhost:7181/api/Divisons/${id}`,
        type: "GET"
    }).done((res) => {
        /*console.log(res.data.id);*/
        let temp = "";
        temp += ` <input type ="hidden" class="form-control" id="hidenId" readonly placeholder="" value = "0">
                   <p>Id: </p><input type ="text" class="form-control" id="divisionId" readonly placeholder= "${res.data.id}" value = "${res.data.id}">
                   <p>Name: </p><input type ="text" class="form-control" id="divisionName" readonly placeholder= "${res.data.name}" value = "${res.data.name}">
                   `
        $("#details").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function editDivision(id) {
        $.ajax({
        type: "GET",
        url: `https://localhost:7181/api/Divisons/${id}`
    }).done((res) => {
        let temp = "";
        temp += ` <input type ="hidden" class="form-control" id="hidenId" readonly placeholder="" value = "0">
                   <p>Id: </p><input type ="text" class="form-control" id="divisionId" placeholder= "${res.data.id}" value = "${res.data.id}">
                    <p>Name: </p><input type ="text" class="form-control" id="divisionName" placeholder= "${res.data.name}" value = "${res.data.name}">
                    `;
        $("#edit").html(temp);
    });
}

function saveEdit() {
    let data;
    let id = parseInt($('#divisionId').val());
    let name = $('#divisionName').val()
   

    data = {
        "id": id,
        "name": name,
        
    }

    $.ajax({
        url: 'https://localhost:7181/api/Divisons/',
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            );
            location.reload();
        }
    });
}
function deleteDivision(id) {
    $.ajax({
        url: `https://localhost:7181/api/Divisons/${id}`,
        method: 'DELETE',
        dataType: 'json',

        success: function (message) {
            alert("Delete Data Successfull" + message);
            location.reload();

        }
    })
}
