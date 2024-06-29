import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ThreadView from "../components/ThreadView";
import { Box, Container, Divider, Pagination } from "@mui/material";
import Sorter from '../components/ForumSortComponent';
import { ThreadDTO } from '../interfaces/types';


const Forum = () => {
  const [sort, setSort] = useState('new');
  const [query, setQuery] = useState<string>("");
  const [threads, setThreads] = useState<ThreadDTO[]>([]);
  const [totalPages, setTotalPages] = useState<string>("");
  const { page: currentPage } = useParams();
  const [followedThreads, setFollowedThreads] = useState<number[]>([]);
  const [likedThreads, setLikedThreads] = useState<number[]>([]);
  const [dislikedThreads, setDislikedThreads] = useState<number[]>([]);

  const navigate = useNavigate();


  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/forum/${value}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchThreadsSorted = async () => {
    try {
      setThreads([])
      const response = await axios.get(`http://localhost:4123/thread/page/${currentPage}`, {
        params: {
          sort: sort,
        }
      });
      console.log(response.data.threads);
      setThreads(response.data.threads);
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const fetchThreadsSearched = async () => {
    try {
      setThreads([])
      const response = await axios.get(`http://localhost:4123/thread/search/${currentPage}`, {
        params: {
          keyword: query,
        }
      });
      console.log(response.data.threads);
      setThreads(response.data.threads);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };



  useEffect(() => {
    console.log("loaded");

    if (query !== "") {
      fetchThreadsSearched();
    } else {
      fetchThreadsSorted();
    }


    const fetchUserActions = async () => {
      try {
        // Fetch followed threads
        const followedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/followed-threads`);
        setFollowedThreads(followedResponse.data);

        // Fetch liked threads
        const likedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/liked-threads`);
        setLikedThreads(likedResponse.data);

        // Fetch disliked threads
        const dislikedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/disliked-threads`);
        setDislikedThreads(dislikedResponse.data);

        console.log("Finished fetching user actions");
      } catch (error) {
        console.log('Error fetching user actions:', error);
      }
    };

    fetchUserActions()

  }, [currentPage, sort, query]);

  const handleApply = (sortBy: string, searchQuery: string) => {
    setSort(sortBy);
    setQuery(searchQuery);
  };

  return (
    <Box>
      <Sorter onApply={handleApply} />
      <Container>
        {threads && threads.map((thread, index) => (
          <div key={index}>
            <ThreadView
              thread={thread}
              setFollowedThreads={setFollowedThreads}
              setLikedThreads={setLikedThreads}
              setDislikedThreads={setDislikedThreads}
              followedThreads={followedThreads}
              likedThreads={likedThreads}
              dislikedThreads={dislikedThreads}
            />
            <Divider style={{ color: "black", backgroundColor: "black", width: '70%', margin: "auto", borderWidth: "1px", marginTop: "25px" }} />
          </div>
        ))}
        <div className="d-flex justify-content-center">
          <div style={{ fontSize: '2.5rem' }}>
            <Pagination count={Number(totalPages)} page={Number(currentPage)} onChange={handleChangePagination} />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Forum;