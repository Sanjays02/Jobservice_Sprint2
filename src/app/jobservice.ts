import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './app.component'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080'; // Updated URL to match your environment

  constructor(private http: HttpClient) {}

  // Method to get all jobs
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/job`);
  }

  // Method to register a new job
  registerJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/job`, job);
  }

  // Method to delete a job by its ID
  deleteJob(jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/job/${jobId}`);
  }

  // Method to update an existing job
  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/job/${job.id}`, job);
  }
}
