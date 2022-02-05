(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
const writingStats = require('writing-stats')

document.getElementById('button').onclick = () => {
    const results = writingStats(document.getElementById('text').value)
    document.getElementById('result').innerHTML = `Word count: ${results.wordCount}<br>Character count: ${results.characterCount}<br>Character count (including punctuation): ${results.rawCharacterCount}<br>Sentence count: ${results.sentenceCount}<br>Longest paragraph: ${results.longestParagraph} sentences<br>Shortest paragraph: ${results.shortestParagraph} sentences<br>Longest sentence: ${results.longestSentence} words<br>Shortest sentence: ${results.shortestSentence} words<br>Average sentence length: ${results.averageSentenceLength} words<br>Average paragraph length: ${results.averageParagraphLength} sentences<br>Sentences more than 10 words above the average length: ${results.aboveAverageSentences}<br>Sentences with more than 5 words below the average length: ${results.belowAverageSentences}<br><br>Words per sentence: ${results.wordCountsPerSentence.join(', ')}<br><br>Sentences per paragraph: ${results.sentenceCountsPerParagraph.join(', ')}`
}
},{"writing-stats":3}],3:[function(require,module,exports){
function writingStats(input, inputLineCount, inputAboveAverageBuffer, inputBelowAverageBuffer, inputSentenceEndCharacters, inputParagraphEndCharacter) {
    const fs = require('fs')
    if (typeof input !== 'string') {
        throw new Error('Parameter `inputFile` must be of type string!')
    }
    file = input
    const validCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const sentenceEndCharacters = inputSentenceEndCharacters || ['.', '?', '!']
    const paragraphEndCharacter = inputParagraphEndCharacter || '\n'
    const lineCount = inputLineCount || 2 // Number of newline characters per paragraph
    const aboveAverageBuffer = inputAboveAverageBuffer || 10
    const belowAverageBuffer = inputBelowAverageBuffer || 5

    let wordCount = 0
    let characterCount = 0
    let rawCharacterCount = file.length
    let sentenceCount = 0
    let paragraphCount = 0
    let longestSentence = 0
    let shortestSentence = file.length
    let wordCountsPerSentence = []
    let longestParagraph = 0
    let shortestParagraph = file.length
    let sentenceCountsPerParagraph = []
    let currentWordCount = 0
    let currentSentenceCount = 0

    for (i = 0; i < file.length; i++) {
        const character = file.charAt(i).toLowerCase()
        while (file.charAt(file.length - 1) == paragraphEndCharacter) {
            file = file.slice(0, file.length - 1)
        }
        if (validCharacters.includes(character)) {
            characterCount++
        }
        if (character == ' ') {
            if (!sentenceEndCharacters.includes(file.charAt(i - 1))) {
                wordCount++
                currentWordCount++
            }
        }
        if (sentenceEndCharacters.includes(character)) {
            wordCount++
            currentWordCount++
            sentenceCount++
            currentSentenceCount++
            longestSentence < currentWordCount ? longestSentence = currentWordCount : longestSentence = longestSentence
            shortestSentence > currentWordCount ? shortestSentence = currentWordCount : shortestSentence = shortestSentence
            wordCountsPerSentence.push(currentWordCount)
            currentWordCount = 0
        }
        if (character == paragraphEndCharacter) {
            paragraphCount = paragraphCount + (1 / lineCount)
            if (paragraphCount % 1 == (1 / lineCount)) {
                longestParagraph < currentSentenceCount ? longestParagraph = currentSentenceCount : longestParagraph = longestParagraph
                shortestParagraph > currentSentenceCount ? shortestParagraph = currentSentenceCount : shortestParagraph = shortestParagraph
                sentenceCountsPerParagraph.push(currentSentenceCount)
            }
            currentSentenceCount = 0
        } else if (i == file.length - 1 && character !== '\r') {
            paragraphCount++
            longestParagraph < currentSentenceCount ? longestParagraph = currentSentenceCount : longestParagraph = longestParagraph
            shortestParagraph > currentSentenceCount ? shortestParagraph = currentSentenceCount : shortestParagraph = shortestParagraph
            sentenceCountsPerParagraph.push(currentSentenceCount)
            currentSentenceCount = 0
        }
    }

    let aboveAverageSentences = 0
    let belowAverageSentences = 0
    let averageSentenceLength = 0
    let averageParagraphLength = 0

    wordCountsPerSentence.forEach(count => {
        averageSentenceLength = averageSentenceLength + count
    })
    averageSentenceLength = averageSentenceLength / wordCountsPerSentence.length

    sentenceCountsPerParagraph.forEach(count => {
        averageParagraphLength = averageParagraphLength + count
    })
    averageParagraphLength = averageParagraphLength / sentenceCountsPerParagraph.length

    wordCountsPerSentence.forEach(count => {
        if (count - averageSentenceLength > aboveAverageBuffer) {
            aboveAverageSentences++
        }
    })

    wordCountsPerSentence.forEach(count => {
        if (averageSentenceLength - count > belowAverageBuffer) {
            belowAverageSentences++
        }
    })
    return {
        wordCount,
        characterCount,
        rawCharacterCount,
        sentenceCount,
        paragraphCount,
        longestSentence,
        shortestSentence,
        wordCountsPerSentence,
        longestParagraph,
        shortestParagraph,
        sentenceCountsPerParagraph,
        aboveAverageSentences,
        belowAverageSentences,
        averageSentenceLength,
        averageParagraphLength
    }
}

module.exports = writingStats
},{"fs":1}]},{},[2]);
