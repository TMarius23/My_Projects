package com.bug_reporter.backend;

import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectPackages({
        "com.bug_reporter.backend.controller",
        "com.bug_reporter.backend.service",
        "com.bug_reporter.backend.model"
})
class BackendApplicationTests {
}
