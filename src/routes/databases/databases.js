import express from "express";
import { get_databases_controller } from "../../controllers/databases/get_databases.js";
import { use_database_controller } from "../../controllers/databases/use_database.js";
import { get_table_content_controller } from "../../controllers/databases/get_table_content.js";
import { get_row_info_controller } from "../../controllers/databases/get_row_info.js";

const router = express.Router();

router.route('/databases/get')
    .get(get_databases_controller);

router.route('/databases/use')
    .post(use_database_controller);

router.route('/databases/table/get')
    .get(get_table_content_controller);

router.route('/databases/row/get')
    .get(get_row_info_controller);

export default router;