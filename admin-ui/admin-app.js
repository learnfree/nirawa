var app=angular.module('app',['ui.router','Routes','controllers','Services', 'froala']);
app.value('froalaConfig', {
        toolbarInline: false,
        placeholderText: 'Enter Text Here'
    });
console.log('in admin app');

app.config(function ($httpProvider) {
	console.log('in admin app congig');
    $httpProvider.interceptors.push('TokenInterceptor');
});
