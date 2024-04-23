let dataTable;
let dataTableInitializad = false;

const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 50, 100, 500, 1000],
    columnDefs: [{ className: "centrar", targets: [0,1,2,3,4,5,6] },
    { orderable: false, targets: [5,6] },
    { searchable: false, targets: [2]}
    //{ width: "50%", targets: [0]}
    ],
    pageLength: 5,
    destroy:true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por pagina",
        zeroRecords: "Ningu usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registos",
        infoEmpty: "Ningun usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Ultimo",
            next: "Siguiente",
            previous: "Anterior"
        }

    }
};
const initDataTable=async()=>{
    if (dataTableInitializad){
        dataTable.destroy();
    }
    await listUsers();

    dataTable = $("#datatable_users").dataTable(dataTableOptions);

    dataTableInitializad = true;
};

const listUsers=async()=>{
    try {
        const response=await fetch("https://jsonplaceholder.typicode.com/users");
        const users=await response.json();

        let content = '';
        users.forEach((user, index) => {
            content += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
                <td>${user.company.name}</td>
                <td><i class="fa-solid fa-check" style="color: green;"></i></td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>  
                </td>

            
            </tr>`;
            tableBody_users.innerHTML = content;
        });

    } catch (error) {
        alert(error);
        
    }
};

window.addEventListener("load",async()=>{
    await initDataTable();

});