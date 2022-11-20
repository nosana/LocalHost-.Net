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
            render: function (data, type, row) {
                return `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#EditModal" onclick="editDivision('${data.id}')">
                          Edit
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#DeleteModal" onclick="deleteDivision('${data.id}')">
                          Delete
                        </button>`;
            }
        },
    ],
});

