'use strict';

var _      = require('lodash');
var chalk  = require('chalk');
var yeoman = require('yeoman-generator');
var yosay  = require('yosay');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.log(yosay(
			'Welcome, let\'s generate a ' + chalk.blue('Clay') + ' project!'
		));
	},

	prompting: function () {
		var done = this.async();

		var prompts = [{
			type: 'input',
			name: 'componentName',
			message: 'How do you want to name your class?',
			default: 'Badge',
			validate: function(input) {
				if (!input) {
					return 'You must provide a class name.';
				}
				if (!/^[^_\-\s\d][^_\-\s]*$/.test(input)) {
					return 'Invalid class name. Class names can\'t contain whitespace or ' +
					'any of the following characters: "-_". Also, class names can\'t ' +
					'start with digits.';
				}

				return true;
			}
		}];

		this.prompt(prompts, function (props) {
			var componentName = props.componentName;

			this.camelCaseName = _.camelCase(componentName);
			this.componentName = componentName;
			this.capitalizeName = _.startCase(componentName);
			this.kebabCaseName = _.kebabCase(componentName);

			this.testEnviroment = props.testEnviroment;
			this.isNodeModule = props.isNodeModule;
			this.repoName = this.kebabCaseName;
			this.buildFormat = props.buildFormat;
			this.templateLanguage = props.templateLanguage || 'None';

			done();
		}.bind(this));
	},

	writing: function () {
		this.destinationRoot('clay-' + this.repoName);

		var demoTemplateName = 'demos/_index.html';

		this.fs.copyTpl(
			this.templatePath(demoTemplateName), this.destinationPath('demos/index.html'),
			{
				componentName: this.componentName,
				capitalizeName: this.capitalizeName,
				repoName: this.repoName
			}
		);
		this.fs.copyTpl(
			this.templatePath('src/_Boilerplate.soy'), this.destinationPath('src/Clay' + this.componentName + '.soy'),
			{
				componentName: this.componentName,
			}
		);
		this.fs.copyTpl(
			this.templatePath('src/_BoilerplateComponent.js'), this.destinationPath('src/Clay' + this.componentName + '.js'),
			{
				componentName: this.componentName,
			}
		);
		this.fs.copyTpl(
			this.templatePath('src/__tests__/_Boilerplate.js'), this.destinationPath('src/__tests__/Clay' + this.componentName + '.js'),
			{
				componentName: this.componentName,
			}
		);
		this.fs.copyTpl(
			this.templatePath('_package.json'), this.destinationPath('package.json'),
			{
				componentName: this.componentName,
				repoName: this.repoName,
			}
		);
		this.fs.copyTpl(
			this.templatePath('_README.md'), this.destinationPath('README.md'),
			{
				repoName: this.repoName,
				componentName: this.componentName,
			}
		);
		this.fs.copy(
			this.templatePath('_LICENSE.md'), this.destinationPath('LICENSE.md')
		);
		this.fs.copyTpl(
			this.templatePath('_webpack.config.js'), this.destinationPath('webpack.config.js'),
			{
				componentName: this.componentName,
			}
		);
	},

	install: function () {
		this.spawnCommand('yarn', ['install']);
	}
});
