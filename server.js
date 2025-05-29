const express = require('express');
const adminAnalytics = require('./admin/analytics');
const adminUserManagement = require('./admin/userManagement');
const adminContentModeration = require('./admin/contentModeration');
// ... other imports

const app = express();
app.use('/api/admin/analytics', adminAnalytics);
app.use('/api/admin/users', adminUserManagement);
app.use('/api/admin/flagged-content', adminContentModeration);
// ... other routes

app.listen(4000, () => console.log("API running on 4000"));