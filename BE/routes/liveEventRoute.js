import { insertLiveEventsDetails,insertTicketDetails,insertVenueDetails ,getBasicLiveEventsByLocation,getLiveEventsByEventCode} from "../controllers/liveEventsController.js";
import {authenticate,authorize} from '../middleware/authMiddleware.js';
import express from 'express';
const router = express.Router();
router.use(express.json());

router.post('/insertLiveEventsDetails',authenticate,authorize('admin') ,insertLiveEventsDetails);

router.post('/insertTicketDetails',authenticate,authorize('admin') ,insertTicketDetails);

router.post('/insertVenueDetails',authenticate,authorize('admin') ,insertVenueDetails);

router.post('/getBasicLiveEventsByLocation',getBasicLiveEventsByLocation)

router.post('/getLiveEventsByEventCode',getLiveEventsByEventCode);

export default router;