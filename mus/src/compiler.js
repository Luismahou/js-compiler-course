var compile = function(expr) {
    var result = compileAndTime(expr, 0);
    return result[0];
};
var compileAndTime = function(expr, startTime) {
    if (expr.tag === 'par') {
        return compilePar(expr, startTime);
    }
    else if (expr.tag === 'seq') {
        return compileSeq(expr, startTime);
    }
    else {
        return [[{ 
            tag: 'note', 
            pitch: expr.pitch, 
            start: startTime, 
            dur: expr.dur 
        }], startTime + expr.dur];
    }
};

var compilePar = function(expr, startTime) {
    var leftResult = compileAndTime(expr.left, startTime);
    var rightResult = compileAndTime(expr.right, startTime);
    var finalTime = Math.max(leftResult[1], rightResult[1]);
    var finalResult = leftResult[0];
    for (var i = 0; i < rightResult[0].length; i++) {
        finalResult.push(rightResult[0][i]);
    }
    return [finalResult, finalTime];
};
var compileSeq = function(expr, startTime) {
    var leftResult = compileAndTime(expr.left, startTime);
    var rightResult = compileAndTime(expr.right, leftResult[1]);
    var finalResult = leftResult[0];
    for (var i = 0; i < rightResult[0].length; i++) {
        finalResult.push(rightResult[0][i]);
    }
    return [finalResult, rightResult[1]];
};

exports.compile = compile;

// var melody_mus = 
//     { tag: 'seq',
//       left: 
//        { tag: 'seq',
//          left: { tag: 'note', pitch: 'a4', dur: 250 },
//          right: { tag: 'note', pitch: 'b4', dur: 250 } },
//       right:
//        { tag: 'seq',
//          left: { tag: 'note', pitch: 'c4', dur: 500 },
//          right: { tag: 'note', pitch: 'd4', dur: 500 } } };

// console.log(melody_mus);
// console.log(compile(melody_mus));