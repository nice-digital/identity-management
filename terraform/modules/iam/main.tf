resource "aws_iam_role" "identity_role" {
  name        = "identity-execution-role"
  description = "identity execution role"
  path        = "/service-role/"
  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "EcsTaskPolicy",
          "Effect" : "Allow",
          "Principal" : {
            "Service" : ["ecs-tasks.amazonaws.com"]
          },
          "Action" : "sts:AssumeRole"
        }
      ]
    }
  )
}

resource "aws_iam_role_policy" "identity_ecs_task_execution" {
  name = "identity-ecs-task-execution"
  role = aws_iam_role.identity_role.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "logs:CreateLogStream",
          "logs:CreateLogGroup",
          "logs:PutLogEvents"
        ],
        "Resource" : "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "identity_ecs_policy_attachment" {
  role       = aws_iam_role.identity_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}