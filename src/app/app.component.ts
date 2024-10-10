import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JobService } from './jobservice'; // Ensure this path is correct

export interface Job {
  id: number | null;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-module';

  jobDetails: Job[] = [];
  jobToUpdate: Job = {
    id: null,
    title: '',
    description: '',
    company: '',
    location: '',
    salary: 0
  };

  loading = false;
  error: string | null = null;

  constructor(private jobService: JobService) {
    this.loadJobDetails();
  }

  register(registerForm: NgForm): void {
    if (registerForm.valid) {
      this.loading = true;
      this.jobService.registerJob(registerForm.value).subscribe({
        next: (resp: Job) => {
          console.log('Job registered:', resp);
          registerForm.reset();
          this.loadJobDetails();
        },
        error: (err) => this.handleError(err),
        complete: () => this.loading = false
      });
    } else {
      console.error('Form is invalid');
    }
  }

  loadJobDetails(): void {
    this.loading = true;
    this.jobService.getJobs().subscribe({
      next: (resp: Job[]) => {
        console.log('Job details:', resp);
        this.jobDetails = resp;
      },
      error: (err) => this.handleError(err),
      complete: () => this.loading = false
    });
  }

  deleteJob(id: number | null): void {
    if (id !== null) {
      console.log('Deleting job with id:', id);
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          this.jobDetails = this.jobDetails.filter(job => job.id !== id);
        },
        error: (err) => this.handleError(err)
      });
    } else {
      console.error('Invalid job ID');
    }
  }

  edit(job: Job): void {
    this.jobToUpdate = { ...job };
  }

  updateJob(): void {
    if (this.jobToUpdate.id !== null) {
      this.loading = true;
      this.jobService.updateJob(this.jobToUpdate).subscribe({
        next: (resp: Job) => {
          console.log('Job updated:', resp);
          this.loadJobDetails();
        },
        error: (err) => this.handleError(err),
        complete: () => this.loading = false
      });
    } else {
      console.error('Job ID is required for update');
    }
  }

  private handleError(err: any): void {
    console.error('An error occurred:', err);
    this.error = 'An error occurred. Please try again later.';
    this.loading = false;
  }
}
