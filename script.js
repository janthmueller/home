
var scanlines = $('.scanlines');
var tv = $('.tv');
function exit() {
    $('.tv').addClass('collapse');
    term.disable();
}

var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

var term = $('#terminal').terminal(function(command, term) {
    var cmd = $.terminal.parse_command(command);
    if (cmd.name === 'exit') {
        exit();
    } else if (cmd.name === 'echo') {
        term.echo(cmd.rest);
    } else if (command !== '') {
        try {
            var result = __EVAL(command);
            if (result !== undefined && ! (result instanceof $.fn.init)) {
                __EVAL(command+'()');
            }
        } catch(e) {
            term.error(new String(e));
        }
    }
}, {
    name: 'website',
    onResize: set_size,
    exit: false,
    // detect iframe codepen preview
    enabled: $('body').attr('onload') === undefined,
    onInit: function() {
        set_size();
        this.clear();
        this.echo('[[b;#fff;]Welcome to my website!]\nType [[b;#fff;]help] to see all commands');
    },

    prompt: 'guest@jantmueller> '
});
function set_size() {
    // for window height of 170 it should be 2s
    var height = $(window).height();
    var width = $(window).width()
    var time = (height * 2) / 170;
    scanlines[0].style.setProperty("--time", time);
    tv[0].style.setProperty("--width", width);
    tv[0].style.setProperty("--height", height);
}

function help() {
    term.echo("Usage: [[b;#fff;]command] [[i;#fff;][options]]");
    printCommand("about", "about me");
    printCommand("contact", "contact me")
    printCommand("help", "show this help");
    printCommand("echo", "echo the input");
    printCommand("clear", "clear the terminal");
    printCommand("exit", "exit the terminal");
    printCommand("credits", "show credits");
    
}
function about(){
    term.echo("Hi, I'm Jan Thomas Müller - a deep learning and computer vision researcher from Germany. This is my personal website, where I want to share my projects and ideas with you.");
}

function credits(){
    term.echo("This website is based on the [[b;#fff;]jQuery Terminal Emulator] and the corresponding vintage style from [[b;#fff;]CodePen] by [[b;#fff;]jcubic].");
    printCommand("Terminal","https://terminal.jcubic.pl/");
    printCommand("CodePen","https://codepen.io/jcubic/pen/BwBYOZ");
    printCommand("jcubic","https://jcubic.pl/me");
}
function contact(){
    printCommand("Email","mail@jantmueller.com")
    printCommand("GitHub","https://github.com/janthmueller")
    printCommand("LinkedIn","https://www.linkedin.com/in/jan-müller-568aba166")
}
function printCommand(command, description) {
    // Calculate the number of spaces needed for consistent spacing
    const spaces = ' '.repeat(12 - command.length);

    // Print the command with consistent spacing
    term.echo(`[[b;#fff;]${command}]${spaces} ${description}`);
}

function clear() {
    term.clear();
}

cssVars(); // ponyfill