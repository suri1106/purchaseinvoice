function showAll() {
    var elements = document.getElementById('hideblock');
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().slice(0, 10);
    let date = document.getElementById('date').max = formattedDate;
    elements.style.display = "block";
    document.getElementById('myForm').reset();
    let table = document.getElementById('lineTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    document.getElementById('invid').value = generateInvoiceId().trim();
    document.getElementById('docno').value = generateDocNo().trim();

}

function off() {
    var elements = document.getElementById('hideblock');
    elements.style.display = "none";
    cancel();
    allClearError();
}
function onHeaderSumbit() {
    validateFormData();
    addRecord();
}

function validateFormData() {
    let vendor = document.getElementById('vendor');
    let date = document.getElementById('date');
    let address = document.getElementById('address');
    if (vendor.value == '') {
        vendor.style.borderColor = 'red';
        document.getElementById('verror').textContent = "Vendor is  required *";
    } else {
        vendor.style.borderColor = 'black';
    }
    if (date.value == '') {
        date.style.borderColor = 'red';
        document.getElementById('date').setAttribute("placeholder", "Invoice date is  required *");


    } else {
        date.style.borderColor = 'black';
        document.getElementById('date').removeAttribute("placeholder");

    }
    if (address.value == '') {

        document.getElementById('address').setAttribute("placeholder", "Address  is required *");
        address.style.borderColor = 'red';


    } else {
        document.getElementById('address').removeAttribute("placeholder");
        address.style.borderColor = 'black';

    }
}
function generateInvoiceId() {
    return `INV${new Date().toISOString().slice(2, 10).replace(/-/g, '')}${Math.floor(Math.random() * 10000).toString().trim().padStart(4, '0')}`;
}
function generateDocNo() {
    return `DOC${new Date().toISOString().slice(2, 10).replace(/-/g, '')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}
let invoiceheader = [];
function addRecord() {
    let invoiceId = document.getElementById('invid').value;
    let vendor = document.getElementById('vendor').value;
    let docno = document.getElementById('docno').value;
    let date = document.getElementById('date').value;
    let address = document.getElementById('address').value;
    let headerTable = document.getElementById('table1');
    let tbody = headerTable.getElementsByTagName('tbody')[0];
    let rows = headerTable.rows;
    if (invoiceId === "" || vendor === '' || docno === '' || date === '' || address === '') {
        return false;
    }
    else {
        let table = document.getElementById('lineTable').getElementsByTagName('tbody')[0];
        let linerows = table.rows;

        if (linerows.length === 0) {
            lineValidateForm();
            return false;
        }
        else {

            let tr = document.createElement('tr');
            let td1 = tr.appendChild(document.createElement('td'));
            let td2 = tr.appendChild(document.createElement('td'));
            let td3 = tr.appendChild(document.createElement('td'));
            let td4 = tr.appendChild(document.createElement('td'));
            let td5 = tr.appendChild(document.createElement('td'));
            let td6 = tr.appendChild(document.createElement('td'));
            // let td7 = tr.appendChild(document.createElement('td'));
            let td8 = tr.appendChild(document.createElement('td'));
            let td9 = tr.appendChild(document.createElement('td'));
            td1.innerHTML = ' <input type="checkbox" name="" class="select-row" style="width: 15px;   position: relative;top: 5px; left: -10px;"">';
            td2.innerHTML = rows.length;
            td3.innerHTML = invoiceId;
            td4.innerHTML = vendor;
            td5.innerHTML = docno;
            td6.innerHTML = date;
            // td7.innerHTML = '   <button">View</button>';
            td8.innerHTML = address;
            td9.innerHTML =
                `   <img src="img.png" class="viewicon" onclick="showLineItem(this)"  alt="" >
             <img src="edit.png" class="edit" onclick=" headerEditRow(this.parentNode.parentNode);" title="edit" alt="edit">&nbsp;
             <img src="icon1.png" class="trash" title="delete" onclick="headdelete(this) " alt="trash">
          `;

            tbody.appendChild(tr);

            const newReceipt = {
                invoiceid: invoiceId,
                vendors: vendor,
                documentno: docno,
                invoicedate: date,
                billingaddress: address,
                invoicelines: []
            };

            for (let i = 0; i < linerows.length; i++) {
                const cells = linerows[i].cells;
                const il = {
                    id: cells[1].textContent.trim(),
                    product: cells[2].textContent.trim(),
                    quantity: cells[3].textContent.trim(),
                    uom: cells[4].textContent.trim(),
                    price: cells[5].textContent.trim(),
                    amount: cells[6].textContent.trim()
                };
                newReceipt.invoicelines.push(il);
            }

            invoiceheader.push(newReceipt);
            console.log(invoiceheader);



        }
        off();
        // resetForms();
        // allErrorClear();

        document.getElementById('myForm').reset();
    }
}

var headIndex = null;
let currentIndexs;
var headerTable = document.getElementById('table1');
function headerEditRow(rowe) {
    showAll();
    headIndex = rowe;
    currentIndexs = rowe.rowIndex;
    var headerUpdateElement = document.getElementById('headerupdatebtn');
    var headerSumbitElement = document.getElementById('submit');
    var headerCancelElement = document.getElementById('Cancels');
    headerUpdateElement.style.display = 'block';
    headerSumbitElement.style.display = 'none';
    // headerUpdateElement.style.position = "relative";
    headerUpdateElement.style.top = "31px";
    headerUpdateElement.style.left = '42%';

    // can.style.bottom = "0px";
    headerCancelElement.style.left = "49%";
    headerCancelElement.innerHTML = 'Cancel';
    const cells = rowe.getElementsByTagName('td');
    document.getElementById('invid').value = cells[2].innerText;
    document.getElementById('vendor').value = cells[3].innerText;
    document.getElementById('docno').value = cells[4].innerText;
    document.getElementById('date').value = cells[5].innerText;
    document.getElementById('address').value = cells[6].innerText;
    var PurchaseInvoice = document.getElementById('PurchaseInvoice').innerHTML = "UPDATE PURCHASE INVOICE";
    let table = document.getElementById('lineTable');
    let tbody = table.getElementsByTagName('tbody')[0];
    let rows = tbody.rows;
    tbody.innerHTML = '';
    for (let i = 0; i < invoiceheader[currentIndexs - 1].invoicelines.length; i++) {

        let row = tbody.insertRow();
        let cell1 = row.insertCell(0);
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'lineselect-row';
        checkbox.className = 'lineselect-row';
        checkbox.style.width = '15px';
        cell1.appendChild(checkbox);
        let cell2 = row.insertCell(1);
        cell2.textContent = invoiceheader[currentIndexs - 1].invoicelines[i].id;
        let cell3 = row.insertCell(2);
        cell3.textContent = invoiceheader[currentIndexs - 1].invoicelines[i].product;
        let cell4 = row.insertCell(3);
        cell4.textContent = invoiceheader[currentIndexs - 1].invoicelines[i].quantity;
        let cell5 = row.insertCell(4);
        cell5.textContent = invoiceheader[currentIndexs - 1].invoicelines[i].uom;
        let cell6 = row.insertCell(5);
        cell6.textContent = invoiceheader[currentIndexs - 1].invoicelines[i].price;
        let cell7 = row.insertCell(6);
        cell7.textContent = invoiceheader[currentIndexs - 1].invoicelines[i].amount;

        let cell8 = row.insertCell(7);
        cell8.innerHTML =
            `<img src="edit.png" class="edit" onclick=" editRow(this.parentNode.parentNode)" title="edit" alt="edit">&nbsp;
             <img src="icon1.png" class="trash" title="delete" onclick="removeProduct(this)" alt="trash">`;


    }

}
function headerUpdateRow(event) {
    if (headIndex) {
        validateFormData();
        const cells = headIndex.getElementsByTagName('td');
        let invoiceId = document.getElementById('invid').value;
        let vendor = document.getElementById('vendor').value;
        let docno = document.getElementById('docno').value;
        let date = document.getElementById('date').value;
        let address = document.getElementById('address').value;
        if (invoiceId === '' || vendor === '' || docno === '' || date === '' || address == '') {
            return false;
        } else {
            cells[2].innerHTML = invoiceId;
            cells[3].innerHTML = vendor;
            cells[4].innerHTML = docno;
            cells[5].innerHTML = date;
            cells[6].innerHTML = address;
            document.getElementById('PurchaseInvoice').innerHTML = "PURCHASE INVOICE";
            var headerUpdateElement = document.getElementById('headerupdatebtn');
            var headerSumbitElement = document.getElementById('submit');
            var headerCancelElement = document.getElementById('Cancels');
            headerUpdateElement.style.display = 'none';
            headerSumbitElement.style.display = 'block';
            headerCancelElement.innerText = 'Clear';

            headerSumbitElement.style.bottom = "-30px";

            //  index = null;

        }


        // var inId = document.getElementById('invid').value
        let tablew = document.getElementById('lineTable');
        let rows = tablew.rows;
        const invoice = invoiceheader.find(inv => inv.invoiceid === invoiceId);

        if (invoice) {
            // Clear existing invoice lines
            invoice.invoicelines = [];

            // Start from index 1 to skip the header row
            for (let i = 1; i < rows.length; i++) {
                let cells = rows[i].cells;

                let id = cells[1].textContent;
                let product = cells[2].textContent;
                let quantity = cells[3].textContent;
                let uom = cells[4].textContent;
                let price = cells[5].textContent;
                let amount = cells[6].textContent;

                let il = {
                    id: id,
                    product: product,
                    quantity: quantity,
                    uom: uom,
                    price: price,
                    amount: amount
                };

                // Update the invoice with new values
                invoice.invoicelines.push(il);
                console.log(invoiceheader)
            }
        }
    }
    off();
}

function cancel() {
    var headerUpdateElement = document.getElementById('headerupdatebtn');
    var headerSumbitElement = document.getElementById('submit');
    var headerCancelElement = document.getElementById('Cancels');
    let table = document.getElementById('lineTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    if (headerCancelElement.innerText === 'Cancel') {
        var headerUpdateElement = document.getElementById('headerupdatebtn');
        var headerSumbitElement = document.getElementById('submit');
        var headerCancelElement = document.getElementById('Cancels');
        headerUpdateElement.style.display = 'none';
        headerSumbitElement.style.display = 'block';
        headerCancelElement.innerText = 'Clear';
        headerSumbitElement.style.bottom = "-30px";
        document.getElementById('PurchaseInvoice').innerHTML = "PURCHASE INVOICE";
        off();
    }
}
// one data remove code 
let headcurrentRow;
function headdelete(img) {
    let id = img.parentNode.parentNode.cells[2].innerText;
    document.getElementById("headeralertText").innerText = `Are you sure to remove the invoice id - ${id}?`;
    document.getElementById("alertBox").style.display = "block";
    headcurrentRow = img.parentNode.parentNode;
}
document.getElementById("confirmBtn").onclick = function () {
    headcurrentRow.parentNode.removeChild(headcurrentRow);
    document.getElementById("alertBox").style.display = "none";
    updateHanderSerialNumbers();
}
document.getElementById("cancelBtn").onclick = function cancelBtn() {
    document.getElementById("alertBox").style.display = "none";
}
function updateHanderSerialNumbers() {
    let tableBody = document.getElementById("TableBody");
    let rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName('td')[1].innerText = i + 1;
    }
}
// All data remove code in header table     
function allClearError() {
    document.getElementById('verror').textContent = '';
    let vendor = document.getElementById('vendor');
    vendor.style.borderColor = 'black';
    let date = document.getElementById('date');
    date.style.borderColor = 'black';
    let address = document.getElementById('address');
    address.style.borderColor = 'black';
    // header clear
    // line 
    resetErrorMessages();
    let quantity = document.getElementById('quantity');
    quantity.style.borderColor = 'black';
    let price = document.getElementById('price');
    price.style.borderColor = 'black';
    document.getElementById('quantity').removeAttribute("placeholder");
    document.getElementById('price').removeAttribute("placeholder", "Price  is required  *");
    document.getElementById('address').removeAttribute("placeholder");
}
function headerSelectAll() {
    let selectAllCheckbox = document.getElementById('selectAllchk');
    let checkboxes = document.getElementsByClassName('select-row');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = selectAllCheckbox.checked;
    }
}

function deleteSelectedRows() {
    let tableBody = document.getElementById('TableBody');
    let rows = tableBody.getElementsByTagName('tr');
    for (let i = rows.length - 1; i >= 0; i--) {
        let checkbox = rows[i].getElementsByTagName('input')[0];
        if (checkbox && checkbox.checked) {
            tableBody.removeChild(rows[i]);
        }
        document.getElementById('selectAllchk').checked = false;
    }
}
document.getElementById("headerDeleteAlls").onclick = function () {
    let selectAllCheckbox = document.getElementById('selectAllchk');
    if (selectAllCheckbox.checked) {
        document.getElementById("headerdeleteBox").style.display = "block";
    }
}

document.getElementById("headerAllconfimBtn").onclick = function () {
    deleteSelectedRows();
    document.getElementById("headerdeleteBox").style.display = "none";
}

document.getElementById("headerAllcancelBtn").onclick = function () {
    document.getElementById('selectAllchk').checked = false;
    document.getElementById("headerdeleteBox").style.display = "none";
}




// line starting
function LineTable() {
    lineValidateForm();
    lineItemRecord();
}
function clearValidate() {
    resetErrorMessages();
    updateUnitOfMeasure()
}
function resetErrorMessages() {
    let product = document.getElementById('Product');

    document.getElementById('prerror').textContent = '';
    document.getElementById('productAlreadyInside').textContent = '';
    product.style.borderColor = 'black';
}
function lineValidateForm() {
    let product = document.getElementById('Product');
    let quantity = document.getElementById('quantity');
    let price = document.getElementById('price');
    if (product.value == '') {
        document.getElementById('prerror').textContent = "Product is required *";
        Product.style.borderColor = 'red';
    } else {
        product.style.borderColor = 'black';

    }

    if (quantity.value == '') {
        quantity.style.borderColor = 'red';
        document.getElementById('quantity').setAttribute("placeholder", "Quantity  is required  *");
    } else {
        document.getElementById('quantity').removeAttribute("placeholder");
        quantity.style.borderColor = 'black';
    }
    if (price.value == '') {
        price.style.borderColor = 'red';
        document.getElementById('price').setAttribute("placeholder", "Price  is required  *");

    } else {
        price.style.borderColor = 'black';
        document.getElementById('price').removeAttribute("placeholder");

    }

}

const productMapping = {
    'Apple': 'KG',
    'Sugar': 'KG',
    'Milk': 'Liter',
    'Oil': 'Liter',
    'Orange': 'KG',
};
function updateUnitOfMeasure() {
    const product = document.getElementById('Product').value;
    const uom = document.getElementById('uom');
    uom.value = productMapping[product];
}

function lineItemRecord() {
    let products = document.getElementById('Product').value;
    let qty = document.getElementById('quantity').value;
    let prices = document.getElementById('price').value;
    let UOM = document.getElementById('uom').value;
    let amount = qty * prices;
    if (products === "" || qty <= 0 || prices <= 0) {
        return false;
    }
    let table = document.getElementById('lineTable');
    let tbody = table.getElementsByTagName('tbody')[0];
    let rows = table.rows;
    let existingProductRow = null;
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].cells[2].innerHTML === products) {
            existingProductRow = rows[i];
            break;
        }
    }
    // document.getElementById('productAlreadyInside').textContent = '';
    if (existingProductRow) {
        document.getElementById('Product').value = '';
        //  error msg
        document.getElementById('productAlreadyInside').textContent = "Product already inside!";

        document.getElementById('Product').style.borderColor = 'red';
        return false;
    } else {
        let tableRows = `
        <tr>
            <td><input type="checkbox" name="lineselect-row" class="lineselect-row" style="width: 15px;"></td>
            <td>${rows.length}</td>
            <td>${products}</td>
            <td>${qty}</td>
            <td>${UOM}</td>
            <td>${prices}</td>
            <td>${amount}</td>
            <td>
                <img src="edit.png" class="edit" onclick="editRow(this.parentNode.parentNode)" title="edit" alt="edit">&nbsp;
                <img src="icon1.png" class="trash" title="delete" onclick="removeProduct(this)" alt="trash">
            </td>
        </tr> `;
        tbody.innerHTML += tableRows;
        document.getElementById('Product').value = "";
        document.getElementById('quantity').value = "";
        document.getElementById('price').value = "";
        document.getElementById('uom').value = "";
    }
    let lineSet = document.querySelector('.lineFieldset');
    // lineSet.classList.add("lineFieldset");
}

var index = null;
let currentIndex;
var lineTbl = document.getElementById('lineTable');
function editRow(row) {
    index = row;
    currentIndex = row.rowIndex;
    var updateElement = document.getElementById('update');
    var addElement = document.getElementById('button');
    var cancelElement = document.getElementById('Cancel');
    updateElement.style.display = 'block';
    addElement.style.display = 'none';

    updateElement.style.position = "relative";
    updateElement.style.bottom = "32px";
    updateElement.style.left = '390px';

    cancelElement.style.position = "relative";
    cancelElement.style.bottom = "63px";
    cancelElement.style.left = "470px";
    cancelElement.innerText = 'Cancel';
    var tblcontainer = document.getElementById('linetablecontainer');
    tblcontainer.style.bottom = "70px";
    // 
    var LineItems = document.getElementById('LineItems').innerHTML = "Update LineItems";


    let lineSet = document.querySelector('.lineFieldset');
    lineSet.classList.add("lineset");

    // // lineSet
    // lineSet.style.height = '350px';

    const cells = row.getElementsByTagName('td');


    document.getElementById('Product').value = cells[2].innerText;
    document.getElementById('quantity').value = cells[3].innerText;
    document.getElementById('uom').value = cells[4].innerText;
    document.getElementById('price').value = cells[5].innerText;


}
// modify update this function name
function updateTable() {
    if (index) {
        const cells = index.getElementsByTagName('td');
        lineValidateForm();
        let product = document.getElementById('Product').value;
        let quantity = document.getElementById('quantity').value;
        let price = document.getElementById('price').value;
        let uom = document.getElementById('uom').value;

        if (product === "" || isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
            return false;
        } else {
            let table = document.getElementById('lineTable');
            document.getElementById('productAlreadyInside').textContent = '';
            for (var i = 1; i < table.rows.length; i++) {
                if (i === currentIndex) { continue };// Skip the current row index
                if (table.rows[i].cells[2].innerHTML === product) {
                    // If product already exists in another row
                    document.getElementById('Product').value = '';
                    document.getElementById('productAlreadyInside').textContent = "Product already inside!";
                    return false;
                }
            }
            cells[2].innerHTML = product;
            cells[3].innerHTML = quantity;
            cells[4].innerHTML = uom;
            cells[5].innerHTML = price;
            cells[6].innerHTML = price * quantity;
            var updateElement = document.getElementById('update');
            var addElement = document.getElementById('button');
            var cancelElement = document.getElementById('Cancel');

            var tblcontainer = document.getElementById('linetablecontainer');
            tblcontainer.style.bottom = "60px";


            let lineSet = document.querySelector('.lineFieldset');
            lineSet.classList.add("lineset");
            document.getElementById('LineItems').innerHTML = "LineItems";


            // lineSet
            // lineSet.style.height = '350px';
            updateElement.style.display = 'none';
            addElement.style.display = 'block';
            cancelElement.innerText = 'Clear';
            addElement.style.position = "relative";
            addElement.style.bottom = "32px";
            addElement.style.left = "390px";
            // index = null;
            // document.getElementById('myForm1').reset();
            document.getElementById('Product').value = "";
            document.getElementById('quantity').value = "";
            document.getElementById('price').value = "";
            document.getElementById('uom').value = "";
        }

    }
}
function updateModeClose() {
    var updateElement = document.getElementById('update');
    var addElement = document.getElementById('button');
    var cancelElement = document.getElementById('Cancel');
    if (updateElement.style.display == 'block') {
        updateElement.style.display = 'none';
        addElement.style.display = 'block';
        // addElement.style.position = "relative";
        // addElement.style.top = "8px";
        // addElement.style.left = "240px";
        document.getElementById('LineItems').innerHTML = "LineItems";
        cancelElement.innerText = 'Clear';
        addElement.style.bottom = '32px';
        addElement.style.left = '380px';
        document.getElementById('Product').value = "";
        document.getElementById('quantity').value = "";
        document.getElementById('price').value = "";
        document.getElementById('uom').value = "";
    }
}





let lineCurrentRow;

function removeProduct(img) {
    let id = img.parentNode.parentNode.cells[2].innerText;
    document.getElementById("linealertText").innerText = `Are you sure to remove the Product - ${id}?`;
    document.getElementById("alertLineBox").style.display = "block";
    lineCurrentRow = img.parentNode.parentNode;
}
document.getElementById("confirmlineBtn").onclick = function () {
    lineCurrentRow.parentNode.removeChild(lineCurrentRow);
    updatelineSerialNumbers();
    document.getElementById("alertLineBox").style.display = "none";
}

document.getElementById("cancellineBtn").onclick = function cancelBtn() {
    document.getElementById("alertLineBox").style.display = "none";
}

document.getElementById("cancelPopBtn").onclick = function () {
    let viewTable = document.getElementById('viewTable');
    let tbody = viewTable.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    document.getElementById("list-overlay").style.display = "none";
}
function updatelineSerialNumbers() {
    let tableBody = document.getElementById("linetbl");
    let rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName('td')[1].innerText = i + 1;
    }
}
function lineSelectAll() {
    let selectAllCheckbox = document.getElementById('lineselectAllchk');
    let check = document.getElementsByClassName('lineselect-row');
    for (let i = 0; i < check.length; i++) {
        check[i].checked = selectAllCheckbox.checked;
    }
}

function lineDeleteAll() {
    let tableBody = document.getElementById('lineTable').getElementsByTagName('tbody')[0];
    let rows = tableBody.getElementsByTagName('tr');
    for (let i = rows.length - 1; i >= 0; i--) {
        let checkbox = rows[i].getElementsByTagName('input')[0];
        if (checkbox && checkbox.checked) {
            tableBody.removeChild(rows[i]);
        }
    }
    updatelineSerialNumbers();
    document.getElementById('lineselectAllchk').checked = false;


}
document.getElementById("lineDeleteAlls").onclick = function () {
    let selectAllCheckbox = document.getElementById('lineselectAllchk');
    if (selectAllCheckbox.checked) {
        document.getElementById("linedeleteBox").style.display = "block";
    }
}

document.getElementById("deleteAllconfimBtn").onclick = function () {
    lineDeleteAll();
    document.getElementById("linedeleteBox").style.display = "none";
}

document.getElementById("deleteAllcancelBtn").onclick = function () {
    document.getElementById("linedeleteBox").style.display = "none";
}


function getLineItem(id) {
    return invoiceheader.find(invoice => invoice.invoiceid === id);
}
// view line item
function showLineItem(view) {
    const over = document.getElementById("list-overlay");
    const popDialog = document.getElementById("list-popupDialog");
    over.style.display = "block";
    popDialog.style.display = "block";
    const parentRow = view.parentNode.parentNode;
    const invoiceIdToFind = parentRow.querySelectorAll('td')[2].innerText;
    document.getElementById('p-invoiceId').innerHTML = invoiceIdToFind;
    document.getElementById('p-vendor').innerHTML = parentRow.querySelectorAll('td')[3].innerText;
    document.getElementById('p-doc').innerHTML = parentRow.querySelectorAll('td')[4].innerText;
    document.getElementById('Date').innerHTML = parentRow.querySelectorAll('td')[5].innerText;
    document.getElementById('billingaddress').innerHTML = parentRow.querySelectorAll('td')[6].innerText;
    const viewTable = document.getElementById('viewTable');
    const tbody = viewTable.getElementsByTagName('tbody')[0];
    // viewTable.innerHTML = "";
    const invoiceLine = getLineItem(invoiceIdToFind);
    if (invoiceLine) {
        invoiceLine.invoicelines.forEach(invoicelines => {
            let row = `<tr>
            <td>${invoicelines.id}</td>
            <td>${invoicelines.product}</td>
            <td>${invoicelines.quantity}</td>
            <td>${invoicelines.uom}</td>
            <td>${invoicelines.price}</td>
            <td>${invoicelines.amount}</td>
        </tr>`;
            tbody.innerHTML += row;
        });
    }
}





























