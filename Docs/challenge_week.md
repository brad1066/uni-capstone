# Challenge Week

## Project overview

My project is to create an Online Teaching Platform. At its most base form, it will allow teachers/tutors to be able to manage their teaching materials and classes from one central place, keeping each class separate from each other. I also intend on allowing students to be signed up to the service, assigned to classes (and groups within those classes) and interact with specific resources that they have permissions to do so with. It would also be ideal for teachers to be able to create assignments for the students to be able to access resources for and to make submissions for the teachers to review and assign marks for.

Finally, allowing communication channels for students to interact directly with their teachers and in group forums would be a great feature to include. This is more of a stretch goal than a requirement, as this is not a simple feature and is distinct enough that the rest of the application can be developed without having it included in the first full release at the end of this project

---

## Similar Product Research

There are a number of platforms that provide an online teaching experience. These include services such as [Udemy](#udemy), [Skillshare](#skillshare) and WordPress sites using the [LearnDash plugin](#learndash-wp-plugin). Each of these implements the experience differently, with access to courses and adding courses being achieved in different ways. Moodle is also another teaching platform, and is the most similar platform to what I intend on producing.

### [Udemy](https://www.udemy.com)

Udemy is a free to access learning site that puts a paywall over all of the courses. Creators can sign up to the site and create a course very quickly. Learners can sign up to courses (paying whatever charge is applied) and have unlimited access to them. They can access these from their own "Courses" dashboard.

Before putting together their first course, the creator must go through a short survey, which is likely to be used for internal statistic within the Udemy Business than for anything functional. It also serves top allow them to suggest some of their own resources to get the creator going based on their level of experiences in teaching, video creation and gaining an audience. Once this survey has been completed, the creator gains access to an instructor dashboard. Here they can see what courses they have, their status etc. It is also here that they start the creation of a new course (via an action button), and receive learning resource suggestions from Udemy.

The process of making a new Course is very simple. The user is led through a multi-step form that focuses on different aspects of the general makeup of the course, and provides a good UX to do so. Once that form has been filled in, there is a full CMS provided for the creator to put together the working components of their course, such as Learning Outcomes, Requirments etc. It also provides a space for each component in the course to be added. Once the course has been fleshed out with content, it is then submitted for an internal review by Udemy.

The way that the application UI and UX is designed is something that is going to inspire my own designs and application flow quite significantly. As the application that I am going to be making is not a SASS product, and is going to be a working example of what can be provided to a teaching institution (such as the University of Essex), the seperate parts of the app will only be accessible to those with related roles (Teacher/Student/Admin).

My research for this service has been done solely through interacting with the site myself. This was possible as all aspects of the creation service are free, and I own a number of courses myself.

### [SkillShare](https://www.skillshare.com/en/)

SkillShare offers a different business model to generate income from courses. Where Udemy uses a Course as a Product model, SkillShare provides a Subscription service to access all content that they provide. Teachers are then payed out based on their course metrics. [See Reference](#skillshare-teacher-earnings). To summarise, they are paid out from a set teaching fund based on their engagement, total time spent on their content (with a minimum of 75 minutes across courses a month).
The student experience of SkillShare is very similar to that of Udemy, providing a simple and clean UI/UX for them to interact with the service and classes. The Teacher experience is somewhat different in terms of signing up, but the actual course creation is very similar. [Reference video for UX (students -> 1, teachers -> 2)](#skillshare-ux)

I personally prefer the Udemy experience completely, as it provides a fresher UI and has a simpler UX for all users to interact with. The other aspects (such as paying for the service or course creation restrictions) are not related to the product that I intend on outputting, so I will not provide my opinion on those.

###	[LearnDash WP Plugin](https://www.learndash.com/best-wordpress-lms-plugin/)

LearnDash is a very different product to the previously mentioned services. First of all, it is a plugin to be used on a WordPress site. WordPress is a technology/Framework that has evolved over the years from a simple Blog CMS to something a lot more complex. The use of plugins such as LearnDash change the base behavious of the basic CMS, and the use of themes are used to change how the content is outputted to the user.

Reviewing the LearnDash website, it outlines what can be done with the plugin. Courses can be broken down into various sections, lessons and topics. At each of these points quizes can be placed. [LearnDash WP site (1)](#learndash-overview). I personally like the way that the courses can be broken down this way. It allows the content to be broken down into small chunks to better categorise and group content, which can provide an effective UX. Whilst I don't intend on my content to be structured in the same way, having this kind of structured nesting is something that I intend on bringing into my project, as I feel like having this will make both creating content and resources simpler, but also making consuming and accessing it easier as well.

My experience of how actually using this plugin comes from a [YouTube video (2)](#learndash-overview) that goes through the plugin and shows off all of the features and experiences that can be had with the plugin. The video was a number of years old, but is the current video that is used on the developers website for the plugin.

The layout of the content for the students is very clean, and I think that there are a lot of different aspects of it that I want to include. There are too many for me to list them all here, but a few of note is the shape of the CTA buttons, the use of accordions to collapse content groups and progress bars to show course and lesson completion.

Given the limitations of the WordPress admin, I also think that the Teacher experience is just as useful. It is more complicated than the previous two solutions, as it has a lot more options on how to display content, down to the colours used in the theme and logos. This is due to the fact that it is a distributable plugin that needs to be adaptable to different business' branding needs. The actual content creation (which is the prime part that I am concerned about in this part of my review) is more flexible than in the other two solutions as well, and allows for more unique content.

Overall, I think that there is a lot that this solution provides, and will be something that I go back to over the course of my project for both sides of the app (teacher and student). Like the other two solutions though, the actual use of these services is more about providing actual lessons rather than just access to resources for lessons that are taught in person. This leads onto the fourth solution that I have researched: Moodle

### Moodle

Moodle is a service that is very similar with the project that I am going to be working on. Because of this, it will provide a lot of inspiration for features and application flow. I have used the platform extensibly over the past 7 years, so am very familiar with many of the features that it offers from a student's point of view. As such I can cherry pick the things that I like about it (such as being assigned only the modules I need, the grouping of module resources etc). As well as this, I can see the things that I don't like about it, such as how the dashboard area works.

I have not experienced the teacher's side of the platform before, so did need to look at some [documentation](https://docs.moodle.org/403/en/) to understand what features the Teachers have access. As it is a large system that is highly customisable to a very tight degree, there is a lot to process. The key points that I was looking for was what could be added and how it displays and arranges those options. With that being the case, the following are the key points that I have found that I feel would be useful to include in my solution:

- Course Structure Panel - This allows the sections and folders that have been made to house the content to be moved around and visualised
- Content Creation Panel - This allows the content on the currently selected section to be modified
- Resources/Blocks - This allows the resources and content blocks to be dropped into the current content page in a list of items.

The names that I have applied to these are not what they are called in the documentation, but are suitable descriptors for their functions. These few features (and perhaps related features) are going to make their way in some form into my solution if I can manage it, as they would provide a sizeable improvement to the resulting product.

---

## Technologies Research

As I am going to be making a Web application, I need to consider the available tech stacks available to me, what each of them brings to the table, and which one I intend on using. The major stacks that are current (and I am familiar with enough to use) are the ME[ARV]N and L[EA]MP. These differ quite a bit, and even have different meanings in different situations [https://dev.to/theme_selection/best-web-development-stack-2jpe]

### ME[ARV]N Stack

MEAN, MERN and MEVN are all stacks that are very similar to each other, differing only in the front-end framework that they utilise. The M stands for MongoDB (or MySql if you need a relational database), the E is for Express.js and the N is for Node.js. The A, R and V options are Angular, React and Vue respectively.

The database used is the first thing to be considered. MySql is a relational SQL database, which is used for storing well structured data that has heavy relationships with each other. MongoDB is the exact opposite of that, and is for storing well customised data structures that may not be related to each other. Due to the structured nature of the data that I will be using, MySQL is likely the better solution here. As well as this, it is a database solution that I am more familiar with, so is better 

Angular is the oldest option, and as such is the 'original' use of this stack for JS development. This has since been replaced as the most popular use of the stack as React has grown in popularity for developers over the years, and is currently the most desired front-end frameworks, with Vue and Angular following that (in that order of desirability) - [reference](https://survey.stackoverflow.co/2023/#section-admired-and-desired-web-frameworks-and-technologies).

I have used both React and Vue in the past, and I preferred React. This is for two reasons:

- The syntax and 

### L[EA]MP Stack

---

## Project Objectives

Content

---

## References

### SkillShare Teacher Earnings
Blog post by SkillShare explaining teacher earnings
https://help.skillshare.com/hc/en-us/articles/4415798406285-Earn-From-Your-Teaching

### Skillshare UX
1. Video on YouTube by Jimmy Tries World reviewing SkillShare as a User (Sep 18, 2020, ~450k views) -> https://www.youtube.com/watch?v=uPapW5o8nvk
2. Video on Youtube by Heilo showing how to upload a SkillShare class as a teacher (Mar 13, 2023, at least 118 views) -> https://www.youtube.com/watch?v=a2ja4EfzCQ4

### LearnDash Overview
1. Plugin Basic Overview and Features - https://www.learndash.com/best-wordpress-lms-plugin/
2. LearnDash 3.0 video overview by LearnDash - https://www.youtube.com/watch?v=9zkZ0qZnGR0&t=8s, 

