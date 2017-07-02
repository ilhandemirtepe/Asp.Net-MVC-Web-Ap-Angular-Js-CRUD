// angularjs modulu tanımlıyoruz
var app = angular.module('demoModule', []);

// Angular js Control Tanımla ve Angular Js  Service bağla
app.controller('demoCtrl', function ($scope, $http, ProductsService) {

    $scope.productsData = null;

    ProductsService.GetAllRecords().then(function (d) {
        $scope.productsData = d.data; // listeleme işlemi başarılı ise
    }, function () {
        alert('hata oluştu!!!'); // listeleme başarılı değilse
    });


    $scope.total = function () {  //Not total:Propduct.cshtml de kullandık
        var total = 0;
        angular.forEach($scope.productsData, function (item) {
            total += item.Price;
        })
        return total;
    }

    $scope.Product = {
        Id: '',
        Name: '',
        Price: '',
    };

    // Urun detayları resetle
    $scope.clear = function () {
        $scope.Product.Id = '';
        $scope.Product.Name = '';
        $scope.Product.Price = '';
    }

    //Yeni ürün ekle
    $scope.save = function () {
        if ($scope.Product.Name != "" &&
            $scope.Product.Price != "") {
          
            $http({
                method: 'POST',
                url: 'api/Product/PostProduct/',
                data: $scope.Product
            }).then(function successCallback(response) {
                $scope.productsData.push(response.data); //listeye ekleme yapar.
                $scope.clear();
                alert("ürün başarılı bir şekilde eklendi");
            }, function errorCallback(response) {
                alert("Hata: " + response.data.ExceptionMessage); //hata varsa
            });
        }
        else {
            alert('lütfen alanların hepsini doldurun !!');
        }
    };

    //Ürün detayları düzenle
    $scope.edit = function (data) {
        $scope.Product = { Id: data.Id, Name: data.Name, Price: data.Price };
    }

    // İptal et ürün detaylarını
    $scope.cancel = function () {
        $scope.clear();
    }

    // Ürün detayları güncelle
    $scope.update = function () {
        if ($scope.Product.Name != "" &&
            $scope.Product.Price != "" ) {
            $http({
                method: 'PUT',
                url: 'api/Product/PutProduct/' + $scope.Product.Id,
                data: $scope.Product
            }).then(function successCallback(response) { //işlem başarılı ise
                $scope.productsData = response.data; //listelemeyi tekrardan yap
                $scope.clear();
                alert("ürün başarılı bir şekilde güncellendi !!!");
            }, function errorCallback(response) {
                alert("Hata : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('lütfen bütün alanlar dolu olsun!!');
        }
    };

    //Ürün sil
    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: 'api/Product/DeleteProduct/' + $scope.productsData[index].Id,
        }).then(function successCallback(response) {
            $scope.productsData.splice(index, 1);
            alert("Ürün başarrılı bir şekilde silindi !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

});
//ben burada factory tanımladım isterseniz farklı  bir sayfada tanımlanabilirsiniz

// Ayrıca POST,DELETE,GET,UPDATE işlemleri controllerde yaptık ..Hem boylece daha okunaklı olur
app.factory('ProductsService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('api/Product/GetAllProducts');
    }
    return fac;
});