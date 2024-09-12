module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Compilação LESS
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development'],
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            },
            js: {
                files: ['src/scripts/**/*.js'],
                tasks: ['copy:dev_js']
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: 'styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: 'scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: 'styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: 'scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        copy: {
            dev_js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/scripts',
                        src: '**/*.js',
                        dest: 'dev/scripts/'
                    }
                ]
            }
        },
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    });

    // Carregar tasks do Grunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify')

    // Registrar tarefas
    grunt.registerTask('default', ['less:development', 'replace:dev', 'copy:dev_js', 'watch']); 
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'copy:dev_js', 'clean', 'uglify'])
};
