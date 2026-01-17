import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Generates a markdown test report from Vitest JSON results
 */

function generateMarkdownReport() {
  try {
    // Read test results JSON
    const resultsPath = join(__dirname, '..', 'test-results.json')
    const results = JSON.parse(readFileSync(resultsPath, 'utf-8'))
    
    // Generate timestamp
    const now = new Date()
    const timestamp = now.toISOString()
    const dateTime = now.toLocaleString('en-US', { 
      dateStyle: 'full', 
      timeStyle: 'long',
      timeZone: 'UTC'
    })
    
    // Calculate statistics
    const totalTests = results.numTotalTests || 0
    const passedTests = results.numPassedTests || 0
    const failedTests = results.numFailedTests || 0
    const skippedTests = results.numSkippedTests || 0
    const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(2) : '0.00'
    
    // Generate report
    let report = `# Test Report - Spanish Flashcard App\n\n`
    report += `**Generated:** ${dateTime}\n`
    report += `**Timestamp:** ${timestamp}\n\n`
    report += `---\n\n`
    
    // Summary
    report += `## Summary\n\n`
    report += `| Metric | Value |\n`
    report += `|--------|-------|\n`
    report += `| Total Tests | ${totalTests} |\n`
    report += `| ✅ Passed | ${passedTests} |\n`
    report += `| ❌ Failed | ${failedTests} |\n`
    report += `| ⏭️ Skipped | ${skippedTests} |\n`
    report += `| Pass Rate | ${passRate}% |\n`
    report += `| Status | ${failedTests === 0 ? '✅ **ALL TESTS PASSED**' : '❌ **TESTS FAILED**'} |\n\n`
    
    // Test results by file
    report += `## Test Results by File\n\n`
    
    if (results.testResults && results.testResults.length > 0) {
      results.testResults.forEach(testFile => {
        const fileName = testFile.name.split(/[\\/]/).pop()
        report += `### ${fileName}\n\n`
        
        if (testFile.assertionResults && testFile.assertionResults.length > 0) {
          testFile.assertionResults.forEach(test => {
            const status = test.status === 'passed' ? '✅' : test.status === 'failed' ? '❌' : '⏭️'
            report += `- ${status} ${test.title}\n`
            
            if (test.status === 'failed' && test.failureMessages) {
              test.failureMessages.forEach(msg => {
                report += `  - Error: ${msg.split('\n')[0]}\n`
              })
            }
          })
        }
        report += `\n`
      })
    }
    
    // Detailed failures
    if (failedTests > 0) {
      report += `## Failed Tests Details\n\n`
      results.testResults.forEach(testFile => {
        if (testFile.assertionResults) {
          testFile.assertionResults.forEach(test => {
            if (test.status === 'failed') {
              report += `### ${test.title}\n\n`
              report += `**File:** ${testFile.name}\n\n`
              if (test.failureMessages) {
                report += `**Error:**\n\`\`\`\n${test.failureMessages.join('\n')}\n\`\`\`\n\n`
              }
            }
          })
        }
      })
    }
    
    // Write report with readable date-time filename
    const dateStr = now.toISOString().replace(/:/g, '-').replace(/\..+/, '').replace('T', '_')
    const reportPath = join(__dirname, '..', `test-report-${dateStr}.md`)
    writeFileSync(reportPath, report)
    
    console.log(`\n✅ Test report generated: ${reportPath}`)
    console.log(`📊 Summary: ${passedTests}/${totalTests} tests passed (${passRate}%)`)
    
    // Exit with appropriate code
    process.exit(failedTests > 0 ? 1 : 0)
  } catch (error) {
    console.error('Error generating report:', error)
    process.exit(1)
  }
}

generateMarkdownReport()
