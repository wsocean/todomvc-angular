/*
 * @Author: Administrator
 * @Date:   2016-02-22 12:33:59
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-02-22 14:22:41
 */


(function(angular) {
    'use strict';
    var controllerApp = angular.module("app.controller", []);

    controllerApp.controller("TodoController", ['$scope', '$routeParams', '$route', '$filter', function($scope, $routeParams, $route, $filter) {
        //输入数据
        $scope.text = '';
        //列表项
        $scope.todos = [{
            id: Math.random(),
            text: '学习',
            completed: true,
        }, {
            id: Math.random(),
            text: '睡觉',
            completed: true,
        }, {
            id: Math.random(),
            text: '吃饭',
            completed: false,
        }];
        //提交
        $scope.add = function() {
            if (!$scope.text) {
                return
            }
            $scope.todos.push({
                id: Math.random(),
                text: $scope.text,
                completed: false,
            });
            $scope.text = '';
        };
        //清除列表项
        $scope.remove = function(id) {
            for (var i = 0; i < $scope.todos.length; i++) {
                if (id === $scope.todos[i].id) {
                    $scope.todos.splice(i, 1);
                    break;
                }
            }
        };
        //清除已完成
        $scope.clear = function() {
            var result = [];
            for (var i = 0; i < $scope.todos.length; i++) {
                if (!$scope.todos[i].completed) {
                    result.push($scope.todos[i]);

                }
            };
            $scope.todos = result

        };
        //根据是否已完成显示“清除全部”
        $scope.exitCompleted = function() {
            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].completed) {
                    return true;
                }
            };
            return false;
        };
        //双击编辑
        $scope.currenteditingId = -1;
        $scope.editing = function(id) {

            $scope.currenteditingId = id;


        };


        //取消编辑状态
        $scope.save = function() {
            $scope.currenteditingId = -1;
        };

        // $scope.toggle = function() {
  //     $scope.save()
  // };


        //全选
        var now = true;
        $scope.toggleAll = function() {
            for (var i = 0; i < $scope.todos.length; i++) {
                $scope.todos[i].completed = now;

            }
            now = !now;
            save();
        };
        //状态筛选
        $scope.selector = {};
        var status = $routeParams.status;

        switch (status) {
            case 'completed':
                $scope.selector = { completed: true };
                break;
            case 'active':
                $scope.selector = { completed: false };
                break;
            default:
                $route.updateParams({ status: '' });
                $scope.selector = {};
                break;
        };



        // $scope.$location = $location;

        // $scope.$watch("$location.path()", function(now, old) {
        //     //$watch只能监视$scope成员
        //     switch (now) {
        //         case '/completed':
        //             $scope.selector = { completed: true };
        //             break;
        //         case '/active':
        //             $scope.selector = { completed: false };
        //             break;
        //         default:
        //             $scope.selector = {};
        //             break;
        //     };

        // });

        //自定义比较函数
        $scope.equalCompare = function(source, target) {
            return source === target;
        };






    }])


})(angular)
