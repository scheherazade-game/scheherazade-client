var isCI = process.env.CI === "true";

module.exports = function(grunt) {

	grunt.loadNpmTasks("steal-tools");
	grunt.loadNpmTasks("testee");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-connect-proxy");
	
	grunt.initConfig({
		testee: {
			options: {
				reporter: "Spec"
			},
			local: {
				options: {
					browsers: ["phantomjs"]
				},
				src: ["test/test.html"]
			},
			ci: {
				options: {
					browsers: ["firefox"]
				},
				src: ["test/test.html"]
			}
		},
		"steal-export": {
			dist: {
				system: {
					config: "package.json!npm"
				},
				outputs: {
					"+global-js": {},
					"+global-css": {}
				}
			}
		},
		connect: {
			dev: {
				options: {
					hostname: "0.0.0.0",
					port: grunt.option("port") || 8000,
					debug: true
				},
				proxies: [{
					context: "/api",
					host: grunt.option("proxy-host") || "localhost",
					port: grunt.option("proxy-port") || 4000,
					ws: true
				}]
			}
		}
	});
	grunt.registerTask("serve", ["connect:dev:keepalive"]);
	grunt.registerTask("build",["steal-export"]);
	grunt.registerTask("test", [isCI ? "testee:ci" : "testee:local"]);
};
