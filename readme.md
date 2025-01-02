# ShowHub - Online Ticket Booking Application

**ShowHub** is a modern online ticket booking platform that allows users to browse and book tickets for movies and events seamlessly. It is designed with scalability, speed, and a user-friendly interface in mind.

---

## Features

- **User Authentication**: OAuth integration for secure login using Google and Facebook.
- **Browse Movies and Events**: Explore a wide range of movies and events with filters and recommendations.
- **Search Functionality**: OpenSearch-powered search for fast and efficient lookups of top movies.
- **Dynamic Booking Options**: View available theaters and showtimes based on movie selection.
- **User Ratings**: Logged-in users can rate movies and view ratings.
- **Profile Management**: Manage user profiles, including booking history and preferences.
- **Scalable Database Architecture**:
  - PostgreSQL: For transactional data, including user bookings and payment records.
  - MongoDB: For storing movie and event data with flexible schemas.
  - Redis: For caching and quick access to frequently searched or accessed data.
  - OpenSearch: For fast search functionality to find top movies in the search bar.
- **ETL Process**: Load theater data from an external source, with movie information and locations.
- **Responsive Angular UI**: A smooth and modern user interface for enhanced user experience.

---

## Tech Stack

### Frontend
- **Angular**: Dynamic and responsive UI for seamless user interactions.

### Backend
- **Node.js**: Efficient server-side logic and RESTful APIs.
- **Express.js**: Lightweight web application framework.

### Databases
- **PostgreSQL**: For relational and transactional data, including user bookings and payment records.
- **MongoDB**: For storing unstructured and semi-structured movie/event data.
- **Redis**: For caching and improving performance of frequently accessed data.
- **OpenSearch**: For fast search of top movies and other search-related functionalities.

### Additional Tools
- **OAuth**: Secure authentication with Google and Facebook integration.
- **Nginx**: Reverse proxy and load balancer for efficient routing.
- **AWS**: Hosting and deployment for scalability and performance.

---

## Project Structure

```
/showhub
├── /UI               # Angular project for UI
│   ├── /src
│   │   ├── /app            # Angular components and services
│   │   └── /assets         # Static files
├── /BE                     # Node.js backend
│   ├── /routes             # API routes
│   ├── /models             # Database models for MongoDB, PostgreSQL, and OpenSearch
│   └── /controllers        # Logic for handling API requests
├── /config                 # Configuration files for databases, Redis, and OpenSearch
├── /public                 # Static assets served by the backend
└── README.md               # Project documentation
```

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+)
- **Angular CLI** (v13+)
- **PostgreSQL**
- **MongoDB**
- **Redis**
- **OpenSearch**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/brassgolem-25/ShowHub.git
   cd showhub
   ```

2. Install dependencies:
   - **Backend**:
     ```bash
     cd BE
     npm install
     ```
   - **Frontend**:
     ```bash
     cd ../UI
     npm install
     ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following keys:
     ```env
     PORT=3000
     POSTGRES_URI=your_postgres_connection_string
     MONGO_URI=your_mongodb_connection_string
     REDIS_URI=your_redis_connection_string
     OPENSEARCH_URI=your_opensearch_connection_string
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     FACEBOOK_CLIENT_ID=your_facebook_client_id
     FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
     POSTGRE_PASS=postgre_password
     ```

4. Start the development servers:
   - **Backend**:
     ```bash
     cd backend
     npm start
     ```
   - **Frontend**:
     ```bash
     cd ../frontend
     ng serve
     ```

5. Access the application at [http://localhost:4200](http://localhost:4200).

---

## Usage

1. **Sign In**: Use the Google or Facebook Sign-In button to log in.
2. **Browse Movies**: Explore movies and events on the homepage.
3. **Search**: Use the search bar powered by OpenSearch to quickly find top movies.
4. **Book Tickets**: Select a movie, view theaters and showtimes, and proceed to book tickets.
5. **Manage Profile**: View your profile and booking history.

---

## Contributing

We welcome contributions to enhance **ShowHub**! Please fork the repository and submit a pull request for review.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any queries or suggestions, feel free to reach out:
- **Email**: tushar.tiwari2002@gmail.com  

--- 

Let me know if you want to add more details or need further changes!