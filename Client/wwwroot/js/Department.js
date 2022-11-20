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
            data:"divisionId",
        },
        {
            data: null,
            render: function (data, type, row) {
                return `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#detailModal" onclick="detailDivision('${data.id}')">
                            <i class="fas fa-folder">
                            </i>
                            View
                        </button>`;
            }
        },
    ],
});

}