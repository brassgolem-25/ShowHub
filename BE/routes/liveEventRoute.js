import { LiveEventController } from '../controllers/liveEventsController.js';
import {authenticate,authorize} from '../middleware/authMiddleware.js';
import express from 'express';
const router = express.Router();
router.use(express.json());

router.post('/insertLiveEventsDetails',authenticate,authorize('admin') ,LiveEventController.insertLiveEventsDetails);

router.post('/insertTicketDetails',authenticate,authorize('admin') ,LiveEventController.insertTicketDetails);

router.post('/insertVenueDetails',authenticate,authorize('admin') ,LiveEventController.insertVenueDetails);

router.post('/getBasicLiveEventsByLocation',LiveEventController.getBasicLiveEventsByLocation)

router.post('/getLiveEventsByEventCode',LiveEventController.getLiveEventsByEventCode);

router.post('/generateJSONData',LiveEventController.generateJSONData);

router.post('/updateLikeCount',LiveEventController.updateLikeCount);

router.post('/getAllEventsByLocation',LiveEventController.getAllEventsByLocation);


export default router;
