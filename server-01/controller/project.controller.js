
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary.config");
const Project = require("../models/Project");
const { Upload } = require("../utils/upload");

// Get all projects
exports.getAllProjects = asyncHandler(async (req, res) => {
    const result = await Project.find({ isDelete: false });
    res.status(200).json({ message: "Projects fetched successfully", result });

});
exports.getProjectById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Project.findOne({ isDelete: false, _id: id });
    res.status(200).json({ message: "Projects fetched successfully", result });

});
// Add a new project
exports.addProject = asyncHandler(async (req, res) => {
    Upload(req, res, async (err) => {

        console.log(req.files, "req.files");


        if (err) {
            console.error(err.message);
            return res.status(400).json({ message: "Multer Error" });
        }

        // Ensure all required images are provided
        const requiredFields = [
            "hero",
            "screenshots-web-main",
            "screenshots-web-other",
            "screenshots-mobile-main",
            "screenshots-mobile-other",
            "sections-web-hero",
            "sections-mobile-hero"
        ];

        for (const field of requiredFields) {
            console.log(req.files);

            if (!req.files[field]) {
                return res.status(400).json({ message: `Missing required images: ${field}` });
            }
        }

        const images = {};
        for (const key in req.files) {
            if (key === "screenshots-web-other" || key === "screenshots-mobile-other") {
                images[key] = [];
                const uploadPromises = req.files[key].map(file => cloudinary.uploader.upload(file.path));
                const uploadedImages = await Promise.all(uploadPromises);
                images[key] = uploadedImages.map(image => image.secure_url);
            } else {
                const { secure_url } = await cloudinary.uploader.upload(req.files[key][0].path);
                images[key] = secure_url;
            }
        }

        try {
            const newProject = await Project.create({
                title: req.body.title,
                shortDesc: req.body.shortDesc,
                description: req.body.description,
                isMobileApp: req.body.isMobileApp,
                technologies: {
                    frontend: req.body.frontend,
                    backend: req.body.backend,
                    mobile: req.body.mobile,
                    hosting: req.body.hosting,
                    collaboration: req.body.collaboration,
                },
                link: req.body.link,
                repository: req.body.repository,
                features: req.body.features,
                duration: req.body.duration,
                learning: req.body.learning,
                hero: images.hero,
                role: req.body.role,
                challenges: req.body.challenges,
                source: req.body.source,
                live: req.body.live,
                screenshots: {
                    web: {
                        main: images["screenshots-web-main"],
                        other: images["screenshots-web-other"]
                    },
                    mobile: {
                        main: images["screenshots-mobile-main"],
                        other: images["screenshots-mobile-other"]
                    }
                },
                sections: {
                    web: [{
                        title: req.body["sections-web-title"],
                        desc: req.body["sections-web-desc"],
                        hero: images["sections-web-hero"]
                    }],
                    mobile: [{
                        title: req.body["sections-mobile-title"],
                        desc: req.body["sections-mobile-desc"],
                        hero: images["sections-mobile-hero"]
                    }]
                },
            });

            res.status(201).json({ message: "Project created successfully", newProject });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating project" });
        }
    });
});


exports.updateProject = asyncHandler(async (req, res) => {
    Upload(req, res, async (err) => {
        if (err) {
            console.error(err.message);
            return res.status(400).json({ message: "Multer Error" });
        }

        const { id } = req.params;

        try {
            const project = await Project.findById(id);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            const updatedData = {
                title: req.body.title || project.title,
                shortDesc: req.body.shortDesc || project.shortDesc,
                description: req.body.description || project.description,
                isMobileApp: req.body.isMobileApp || project.isMobileApp,
                technologies: {
                    frontend: req.body.frontend || project.technologies.frontend,
                    backend: req.body.backend || project.technologies.backend,
                    mobile: req.body.mobile || project.technologies.mobile,
                    hosting: req.body.hosting || project.technologies.hosting,
                    collaboration: req.body.collaboration || project.technologies.collaboration,
                },
                link: req.body.link || project.link,
                repository: req.body.repository || project.repository,
                features: req.body.features || project.features,
                duration: req.body.duration || project.duration,
                learning: req.body.learning || project.learning,
                role: req.body.role || project.role,
                challenges: req.body.challenges || project.challenges,
                source: req.body.source || project.source,
                live: req.body.live || project.live,
            };

            if (req.files) {
                // Handle hero image update
                if (req.files.hero) {
                    if (project.hero) {
                        await cloudinary.uploader.destroy(project.hero);
                    }
                    const { secure_url } = await cloudinary.uploader.upload(req.files.hero[0].path);
                    updatedData.hero = secure_url;
                }

                // Handle screenshots updates for web
                if (req.files["screenshots-web-main"]) {
                    if (project.screenshots?.web?.main) {
                        await cloudinary.uploader.destroy(project.screenshots.web.main);
                    }
                    const { secure_url } = await cloudinary.uploader.upload(req.files["screenshots-web-main"][0].path);
                    updatedData.screenshots = { ...updatedData.screenshots, web: { ...project.screenshots?.web, main: secure_url } };
                }

                if (req.files["screenshots-web-other"]) {
                    if (project.screenshots?.web?.other) {
                        for (const screenshot of project.screenshots.web.other) {
                            await cloudinary.uploader.destroy(screenshot);
                        }
                    }
                    const otherWebScreenshots = await Promise.all(
                        req.files["screenshots-web-other"].map(async (file) => {
                            const { secure_url } = await cloudinary.uploader.upload(file.path);
                            return secure_url;
                        })
                    );
                    updatedData.screenshots = { ...updatedData.screenshots, web: { ...updatedData.screenshots.web, other: otherWebScreenshots } };
                }

                // Handle screenshots updates for mobile
                if (req.files["screenshots-mobile-main"]) {
                    if (project.screenshots?.mobile?.main) {
                        await cloudinary.uploader.destroy(project.screenshots.mobile.main);
                    }
                    const { secure_url } = await cloudinary.uploader.upload(req.files["screenshots-mobile-main"][0].path);
                    updatedData.screenshots = { ...updatedData.screenshots, mobile: { ...project.screenshots?.mobile, main: secure_url } };
                }

                if (req.files["screenshots-mobile-other"]) {
                    if (project.screenshots?.mobile?.other) {
                        for (const screenshot of project.screenshots.mobile.other) {
                            await cloudinary.uploader.destroy(screenshot);
                        }
                    }
                    const otherMobileScreenshots = await Promise.all(
                        req.files["screenshots-mobile-other"].map(async (file) => {
                            const { secure_url } = await cloudinary.uploader.upload(file.path);
                            return secure_url;
                        })
                    );
                    updatedData.screenshots = { ...updatedData.screenshots, mobile: { ...updatedData.screenshots.mobile, other: otherMobileScreenshots } };
                }

                // Handle sections updates for web
                if (req.files["sections-web-hero"]) {
                    updatedData.sections = updatedData.sections || {};
                    updatedData.sections.web = updatedData.sections.web || project.sections?.web || [];
                    const sectionWebHeroUrl = await Promise.all(
                        req.files["sections-web-hero"].map(async (file, index) => {
                            const { secure_url } = await cloudinary.uploader.upload(file.path);
                            return {
                                ...updatedData.sections.web[index],
                                hero: secure_url,
                            };
                        })
                    );
                    updatedData.sections.web = sectionWebHeroUrl;
                }

                // Handle sections updates for mobile
                if (req.files["sections-mobile-hero"]) {
                    updatedData.sections = updatedData.sections || {};
                    updatedData.sections.mobile = updatedData.sections.mobile || project.sections?.mobile || [];
                    const sectionMobileHeroUrl = await Promise.all(
                        req.files["sections-mobile-hero"].map(async (file, index) => {
                            const { secure_url } = await cloudinary.uploader.upload(file.path);
                            return {
                                ...updatedData.sections.mobile[index],
                                hero: secure_url,
                            };
                        })
                    );
                    updatedData.sections.mobile = sectionMobileHeroUrl;
                }
            }

            const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

            res.status(200).json({ message: "Project updated successfully", updatedProject });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating project" });
        }
    });
});



exports.deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Project.findByIdAndUpdate(id, { isDelete: true })
    res.status(200).json({ message: "Project Delete Success" })
});





exports.deleteProject = asyncHandler(async (req, res) => {
    Upload(req, res, async (err) => {

        if (err) {
            console.error(err.message);
            return res.status(400).json({ message: "Multer Error" });
        }
        const { id } = req.params;

        try {
            const project = await Project.findById(id);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            const deletionPromises = [];

            // Add hero image to deletion
            if (project.hero?.public_id) {
                deletionPromises.push(cloudinary.uploader.destroy(project.hero.public_id));
            }

            // Delete section images
            for (const section of [...project.sections.web, ...project.sections.mobile]) {
                if (section.hero?.public_id) {
                    deletionPromises.push(cloudinary.uploader.destroy(section.hero.public_id));
                }
            }

            // Delete screenshots
            for (const key of ["web", "mobile"]) {
                if (project.screenshots[key]?.main?.public_id) {
                    deletionPromises.push(cloudinary.uploader.destroy(project.screenshots[key].main.public_id));
                }
                for (const screenshot of project.screenshots[key]?.other || []) {
                    if (screenshot?.public_id) {
                        deletionPromises.push(cloudinary.uploader.destroy(screenshot.public_id));
                    }
                }
            }

            await Promise.all(deletionPromises);
            await Project.findByIdAndDelete(id);

            res.status(200).json({ message: "Project deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting project" });
        }
    })
});
