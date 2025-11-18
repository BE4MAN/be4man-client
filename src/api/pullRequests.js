import axiosInstance from './axios';

export async function getMyPullRequestsByGithubId(githubId) {
  const { data } = await axiosInstance.get('/api/prs', {
    params: { githubId },
  });
  return data;
}

export async function getPullRequestById(id) {
  const { data } = await axiosInstance.get(`/api/prs/${id}`);
  return data;
}
