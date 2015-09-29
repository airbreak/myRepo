var requst, db, store;
var datainfo = [
    { ssn: '444-444', name: 'Jimmy', age: 25, email: '123256@qq.com' },
    { ssn: '555-555', name: 'Jack', age: 45, email: '9896@qq.com' },
    { ssn: '666-666', name: 'Joe', age: 55, email: '1236344256@qq.com' }
];
function createDatabase(dbName) {
    request = window.indexedDB.open('JimmyDB', 1);
    request.onsuccess = function () {
        
    };

    request.onerror = function () {
        alert('fail to open database with');
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        //添加一个表
        var objectStore = db.createObjectStore('customers', { keyPath: 'ssn' });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
    }; 
}

function deleteDatabase(dbName) {
    try { indexedDB.deleteDatabase(dbName); }
    catch (e) {
        alert(e.message);
    }
}

function addDataInfoToDatabase() {
    var objctStoreData = [
        { ssn: '444-444', name: 'Jimmy', age: 25, email: '123256@qq.com' },
        { ssn: '555-555', name: 'Jack', age: 45, email: '9896@qq.com' },
        { ssn: '666-666', name: 'Joe', age: 55, email: '1236344256@qq.com' }
    ];
    var transaction = db.transaction(['customers'], 'readwrite');
    transaction.oncomplete = function (event) {

    };
    transaction.onerror = function (event) {
        //错误处理
        console.log(event.message);
    };
    var objectStore = transaction.objectStore('customers');
    for (var i in objctStoreData) {
        var myrequest = objectStore.add(objctStoreData[i]);
        myrequest.onsuccess = function (event) {
            event.target.result = objctStoreData[i].ssn;
        };
    }
}

function getDataFromIndexDB() {
    var transaction = db.transaction(['customers']);
    var objectStore = transaction.objectStore('customers');
    var myrequest = objectStore.get('666-666');
    myrequest.onerror = function (event) {
        console.log('读取失败');
    }
    myrequest.onsuccess = function (event) {
        var ss=JSON.stringify(myrequest.result);
        console.log(ss);
    };
}

function updateDataFromIndexDB(){
    var transaction = db.transaction(['customers'], 'readwrite');
    var objectStore = transaction.objectStore('customers');
    var myrequest = objectStore.get('666-666');
    myrequest.onerror = function (event) {
        console.log('读取失败');
    }
    myrequest.onsuccess = function (event) {
        var tempData = event.target.result;
        tempData.name = 'new Joe';
        var newRequest = objectStore.put(tempData);
        newRequest.onsuccess = function (e) {
            console.log('更新成功');
        }
        newRequest.onerror = function (e) {
            console.log(e.value);
        }
    }
}