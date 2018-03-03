class TasksController < ApplicationController
  def index
    tasks = Task.all
    render json: tasks
  end

  def create
    task = Task.new(task_params)
    if task.save
      render json: Task.all, status: :ok
    else
      render json: {:errors => task.errors}, :status => 422
    end

  end

  def destroy
    task = Task.find(params[:id])
    task.delete
    render json: Task.all
  end

  private

  def task_params
    params.permit(:text, :status)
  end
end
