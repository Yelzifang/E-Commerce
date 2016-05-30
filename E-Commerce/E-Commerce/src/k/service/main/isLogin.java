package k.service.main;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class isLogin
 */
@WebServlet("/isLogin")
public class isLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public isLogin() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");

		boolean Logined = false;
		String detail;

		JSONObject login_message = new JSONObject();
		JSONObject login_json = new JSONObject();

		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();

		if (session.getAttribute("Logined") != null) {

			Logined = (boolean) session.getAttribute("Logined");

			if (Logined) {
				System.out.println("已经登录");
				try {
					detail = "已经登录";
					login_message.put("id", session.getAttribute("id"));
					login_message.put("username",
							session.getAttribute("username"));
					login_message.put("identity",
							session.getAttribute("identity"));
				} catch (JSONException e) {
					e.printStackTrace();
					detail = "构建JSON语句失败";
					Logined = false;
				}

			} else {
				System.out.println("尚未登录");
				detail = "尚未登录";
			}
		} else {
			System.out.println("Logined为空");
			detail = "从未登录";
			Logined = false;
			login_message = null;
		}

		try {
			login_json.put("status", Logined);
			login_json.put("detail", detail);
			login_json.put("message", login_message);

			System.out.println(login_json.toString());
			out.print(login_json.toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
