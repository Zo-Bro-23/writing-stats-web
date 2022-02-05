const writingStats = require('writing-stats')

document.getElementById('button').onclick = () => {
    const results = writingStats(document.getElementById('text').value)
    document.getElementById('result').innerHTML = `Word count: ${results.wordCount}<br>
Character count: ${results.characterCount}<br>
Character count (including punctuation): ${results.rawCharacterCount}<br>
Sentence count: ${results.sentenceCount}<br>
Paragraph count: ${results.paragraphCount}<br>
Longest paragraph: ${results.longestParagraph} sentences<br>
Shortest paragraph: ${results.shortestParagraph} sentences<br>
Longest sentence: ${results.longestSentence} words<br>
Shortest sentence: ${results.shortestSentence} words<br>
Average sentence length: ${results.averageSentenceLength} words<br>
Average paragraph length: ${results.averageParagraphLength} sentences<br>
Sentences more than 10 words above the average length: ${results.aboveAverageSentences}<br>
Sentences with more than 5 words below the average length: ${results.belowAverageSentences}<br>
<br>
Words per sentence: ${results.wordCountsPerSentence.join(', ')}<br>
<br>
Sentences per paragraph: ${results.sentenceCountsPerParagraph.join(', ')}`
}