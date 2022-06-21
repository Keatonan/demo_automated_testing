const {Builder, By, until} = require('selenium-webdriver');

async function testLogin() {

    const driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://www.demoblaze.com/');
    
    // Open the login form
    let loginButton = await driver.findElement(By.id('login2'));
    await loginButton.click();
    
    // Fill out the login information
    let usernameBox = await 
    driver.findElement(By.id('loginusername'));
    await usernameBox.sendKeys("yellow");
    
    let passwordBox = await driver.findElement(By.id('loginpassword'));
    await passwordBox.sendKeys("password");
    
    // Attempt to Login
    let submitButton = await driver.findElement(By.css("#logInModal .btn-primary"))
    await submitButton.click()
    
    // Log out
    await driver.wait(until.elementLocated(By.id('logout2'), 2000));
    for (let i=0; i<3; i++){    
        try {
            let logoutButton = await driver.wait((until.elementIsVisible(driver.findElement(By.id('logout2')), 4000)));
            logoutButton.click();
        }
        catch (e) {
            if (typeof e == "StaleElementReferenceError") {
                console.log("Logout button gone stale. Trying again...")
            }
        }
    }

    console.log("Successfully logged in and out of an account");
}

module.exports = {testLogin}