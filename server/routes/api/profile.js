const express = require('express');
const router = express.Router();
const axios = require('axios');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
require('dotenv').config();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/profile/me
// @desc     Get current user's profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        console.log('Profile fetch attempt - User ID:', req.user.id);
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        console.log('Profile fetch result:', profile ? 'Profile found' : 'No profile found');

        if (!profile) {
            console.log('No profile found for user:', req.user.id);
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        console.log('Sending profile response');
        res.json(profile);
    } catch (err) {
        console.error('Profile fetch error:', err.message);
        res.status(500).send('Server Error');
    }
});

// route            POST api/profile/
// @desc            Create or update user user profile
// @access          Private
router.post('/',auth, check('status', 'Status is required').notEmpty(), check('skills', 'Skills is required').notEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

     // destructure the request
     const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        // spread the rest of the fields we don't need to check
        ...rest
      } = req.body;
  
      // build a profile

      const profileFields = {
        user: req.user.id,
        website:
          website && website !== ''
            ? normalize(website, { forceHttps: true })
            : '',
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((skill) => ' ' + skill.trim()),
        ...rest
      };
  
      // Build socialFields object
      const socialFields = { youtube, twitter, instagram, linkedin, facebook };
  
      // normalize social fields to ensure valid url
      for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
          socialFields[key] = normalize(value, { forceHttps: true });
      }
      // add to profileFields
      profileFields.social = socialFields;
  
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
    }
  );
  
// route            GET api/profile
// @desc            Get all profiles
// @access          Public
router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
    '/user/:user_id',
    checkObjectId('user_id'),
    async ({ params: { user_id } }, res) => {
      try {
        const profile = await Profile.findOne({
          user: user_id
        }).populate('user', ['name', 'avatar']);
  
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });
  
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
  );

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
      // Remove user posts
      // Remove profile
      // Remove user
    await Promise.all([
       // Post.deleteMany({ user: req.user.id }),
          Profile.findOneAndDelete({ user: req.user.id }),
          User.findOneAndDelete({ _id: req.user.id })
      ]);
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
    '/experience',
    auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('company', 'Company is required').notEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => {
          const fromDate = new Date(value);
          const toDate = req.body.to ? new Date(req.body.to) : null;
  
          // Ensure 'from' is in the past
          if (fromDate >= new Date()) {
            throw new Error('From date must be in the past');
          }
  
          // Ensure 'from' is before 'to' if 'to' is provided
          if (toDate && fromDate >= toDate) {
            throw new Error("'From' date must be before 'To' date");
          }
  
          return true;
        })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        // Add the new experience to the beginning of the experience array
        profile.experience.unshift(req.body);
  
        // Save the updated profile
        await profile.save();
  
        // Respond with the updated profile
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
  
      foundProfile.experience = foundProfile.experience.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
      );
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
    '/education',
    auth,
    [
      check('school', 'School is required').notEmpty(),
      check('degree', 'Degree is required').notEmpty(),
      check('fieldofstudy', 'Field of study is required').notEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => {
          const fromDate = new Date(value); // Convert 'from' to Date
          const toDate = req.body.to ? new Date(req.body.to) : null;
  
          if (isNaN(fromDate.getTime())) {
            throw new Error('Invalid from date format');
          }
  
          if (fromDate >= new Date()) {
            throw new Error('From date must be in the past');
          }
  
          if (toDate && fromDate >= toDate) {
            throw new Error('From date must be before To date');
          }
  
          return true;
        })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.education.unshift(req.body);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  
  // @route    DELETE api/profile/education/:edu_id
  // @desc     Delete education from profile
  // @access   Private
  router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.education = foundProfile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
    try {
        // Basic configuration for the GitHub API request
        const options = {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        };

        // Make request to GitHub API
        const response = await axios.get(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
            options
        );

        // If successful, return the data
        return res.json(response.data);

    } catch (err) {
        // Enhanced error handling
        if (err.response) {
            // GitHub API responded with an error
            if (err.response.status === 404) {
                return res.status(404).json({ msg: 'GitHub profile not found' });
            }
            if (err.response.status === 403) {
                return res.status(403).json({ msg: 'API rate limit exceeded' });
            }
            return res.status(err.response.status).json({ msg: err.response.data.message });
        }
        
        // Network or other errors
        console.error('GitHub API Error:', err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;