Package.describe({
  name: 'nerdburn:flash',
  version: '0.0.1',
  summary: 'A simple flash message utility.',
//  git: 'https://github.com/nerdburn/meteor-flash.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use(['templating', 'less'], 'client');
  api.addFiles(['flash.less', 'flash.html', 'flash.js'], 'client');
  api.export('Flash', ['client']);  
});