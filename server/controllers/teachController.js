const { QueryTypes } = require("sequelize");
const sequelize = require("../util/database");
const { successResponse, errorResponse } = require("../util/helper");
const Lecture = require("../models/lecture");
const Account = require("../models/account");

exports.getLectureAccount = async (req, res, _) => {
  try {
    const { lectureId } = req.params;
    const teach = await Lecture.findByPk(lectureId, {
      attributes: ["id", "name"],
      include: [
        {
          model: Account,
          attributes: ["account_id", "firstName", "lastName"],
        },
      ],
    });
    if (!teach) {
      throwError(`Could not find lecture`, 404);
    }
    successResponse(res, 200, teach, "GET");
  } catch (error) {
    errorResponse(res, error);
  }
};

exports.deleteLectureAccount = async (req, res, _) => {
  try {
    const { lectureId, accountId } = req.body;
    console.log(lectureId);
    const deleteTeach = await sequelize.query(
      `DELETE FROM teach WHERE teach.accountId = ${accountId} AND teach.lectureId = '${lectureId}'`,
      {
        replacements: { accountId: accountId, lectureId: lectureId },
        type: sequelize.QueryTypes.DELETE,
      }
    );
    successResponse(res, 200, deleteTeach, "DELETE");
  } catch (error) {
    errorResponse(res, error);
  }
};

exports.postTeach = async (req, res, _) => {
  try {
    const { lectureId, account_id } = req.body;
    const lecture = await Lecture.findByPk(lectureId);
    const account = await Account.findOne({
      where: {
        account_id,
      },
    });
    if (!lecture) {
        throwError(`Could not find lecture`, 404);
      }
      if (!account) {
        throwError(`Could not find account`, 404);
      }
      await account.addLecture(lecture)
    successResponse(res, 200, _, "POST");
  } catch (error) {
    errorResponse(res, error);
  }
};
