const { Router } = require("express");
const auth = require("../auth/middleWare");
const Project = require("./model");
const Studio = require("../studio/model");
const Image = require("../image/model");
const router = new Router();

router.get("/project", async function(request, response, next) {
  try {
    const projects = await Project.findAll();
    response.send(projects);
    console.log("done");
  } catch (error) {
    next(error);
  }
});

router.get("/project/:id", async function(request, response, next) {
  try {
    const project = await Project.findByPk(request.params.id);
    response.send(project);
    console.log("done");
  } catch (error) {
    next(error);
  }
});

// router.post("/studio/:id/project", auth, async function(
//   request,
//   response,
//   next
// ) {
//   try {
//     console.log("how my request looks?", request.user.dataValues.id);
//     console.log("WHAT IS STUDIO ID ", request.params.id);

//     const studio = await Studio.findByPk(request.params.id);
//     if (studio) {
//       request.body.projectDetails.userId = request.user.dataValues.id;
//       console.log("HOW MY REQUEST  BODY LOOOKS ", request.body);
//       const newProject = { ...request.body };
//       console.log("what is my new !!!!! project ", newProject.projectDetails);
//       newProject.projectDetails.studioId = request.params.id;
//       const project = await Project.create(newProject.projectDetails);
//       await Promise.all(
//         project.image.map(async image => {
//           await Image.create({
//             image: image,
//             projectId: newProject.id
//           });
//         })
//       );

//       const newProjectWithImages = await Project.findByPk(newProject.id, {
//         include: [Image]
//       });
//       response.send(newProjectWithImages);
//     } else {
//       return response.status(404).send("Page not Found");
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/items", async (request, response, next) => {
//   // console.log("create item ", request.body);
//   try {
//     const newItem = await Item.create(request.body);
//     await Promise.all(
//       request.body.imageUrls.map(async link => {
//         await Image.create({
//           imageUrl: link,
//           itemId: newItem.id
//         });
//       })
//     );
//     const newItemWithImages = await Item.findByPk(newItem.id, {
//       include: [Image]
//     });
//     response.send(newItemWithImages);
//   } catch (error) {
//     next(error);
//   }
// });

router.patch("/project/:id", async function(request, response, next) {
  try {
    const project = await Project.findByPk(request.params.id);
    if (project) {
      return response.send(await project.update(request.body));
    } else {
      return response.status(404).send("Page not Found");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/myproject", auth, async function(request, response, next) {
  console.log("my studdiiooooooo / user id ", request.user.dataValues.id);
  const userId = request.user.dataValues.id;
  try {
    const project = await Project.findAll({
      where: {
        userId: userId
      }
    });
    response.send(projects);
    console.log("done");
  } catch (error) {
    next(error);
  }
});

router.patch("/project/:id", async function(request, response, next) {
  try {
    const project = await Project.findByPk(request.params.id);
    if (project) {
      return response.send(await project.update(request.body));
    } else {
      return response.status(404).send("Page not Found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;