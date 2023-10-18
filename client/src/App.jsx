import Header from "./components/Header/Header";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://project-management-16n2.onrender.com/graphql",
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects/:id' element={<Project />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
